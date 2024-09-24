import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import randomInt from "random-int";
import randomColor from "randomcolor";
import Circle from "./Circle";
import Box from "./Box";
import getRandomDecimal from "./getRandomDecimal";
import { Accelerometer } from 'expo-sensors';

const { height, width } = Dimensions.get('window');
const BALL_SIZE = 40;
const DEBRIS_HEIGHT = 70;
const DEBRIS_WIDTH = 20;
const WALL_THICKNESS = 10;

const mid_point = (width / 2) - (BALL_SIZE / 1);

const ballSettings = {
  isStatic: false
};

const debrisSettings = {
  isStatic: false,
  density: 50
};

const ball = Matter.Bodies.circle(mid_point, height - 100, BALL_SIZE / 2, {
  ...ballSettings,
  label: "ball"
});

const floor = Matter.Bodies.rectangle(width / 2, height, width, 10, {
  isStatic: true,
  isSensor: true,
  label: "floor"
});

const leftWall = Matter.Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height, {
  isStatic: true,
  label: "leftWall"
});

const rightWall = Matter.Bodies.rectangle(width + WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height, {
  isStatic: true,
  label: "rightWall"
});

export default class GameScreen extends Component {
  state = {
    x: mid_point,
    y: height - 100,
    isGameReady: false,
    isGameOver: false,
    score: 0,
    funPoints: 0,
    hasFunPointsAdded: false
  };

  constructor(props) {
    super(props);

    this.debris = [];
    this.updateFun = props.route.params?.updateFun;

    const { engine, world } = this._addObjectsToWorld(ball);
    this.entities = this._getEntities(engine, world, ball);

    this._setupCollisionHandler(engine);

    this.physics = (entities, { time }) => {
      if (this.state.isGameOver) {
        return entities;
      }

      let engine = entities["physics"].engine;

      Matter.Engine.update(engine, time.delta);
      Matter.Body.setPosition(ball, {
        x: this.state.x,
        y: height - 100
      });

      return entities;
    };
  }

  componentDidMount() {
    Accelerometer.setUpdateInterval(100);
    this._subscription = Accelerometer.addListener(({ x }) => {
      if (this.state.isGameOver) {
        return;
      }

      const newX = this.state.x - x * 30;

      Matter.Body.setPosition(ball, {
        x: newX,
        y: height - 100
      });

      this.setState(state => ({
        x: newX
      }));
    });

    this.setState({
      isGameReady: true
    });
  }

  componentWillUnmount() {
    this._subscription && this._subscription.remove();
  }

  _addObjectsToWorld = (ball) => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    engine.world.gravity.y = 0.2;
    const world = engine.world;

    let objects = [
      ball,
      floor,
      leftWall,
      rightWall
    ];

    for (let x = 0; x <= 5; x++) {
      const debris = Matter.Bodies.rectangle(
        randomInt(1, width - 30),
        randomInt(0, 200),
        DEBRIS_WIDTH,
        DEBRIS_HEIGHT,
        {
          frictionAir: getRandomDecimal(0.003, 0.1),
          label: 'debris'
        }
      );

      this.debris.push(debris);
    }

    objects = objects.concat(this.debris);
    Matter.World.add(world, objects);

    return {
      engine,
      world
    };
  };

  _getEntities = (engine, world, ball) => {
    const entities = {
      physics: {
        engine,
        world
      },
      playerBall: {
        body: ball,
        size: [BALL_SIZE, BALL_SIZE],
        renderer: Circle
      },
      gameFloor: {
        body: floor,
        size: [width, 10],
        color: '#414448',
        renderer: Box
      },
      leftWall: {
        body: leftWall,
        size: [WALL_THICKNESS, height],
        color: 'transparent',
        renderer: Box
      },
      rightWall: {
        body: rightWall,
        size: [WALL_THICKNESS, height],
        color: 'transparent',
        renderer: Box
      }
    };

    for (let x = 0; x <= 5; x++) {
      Object.assign(entities, {
        ['debris_' + x]: {
          body: this.debris[x],
          size: [DEBRIS_WIDTH, DEBRIS_HEIGHT],
          color: randomColor({ luminosity: 'dark' }),
          renderer: Box
        }
      });
    }

    return entities;
  };

  _setupCollisionHandler = (engine) => {
    Matter.Events.on(engine, "collisionStart", (event) => {
        var pairs = event.pairs;
        var objA = pairs[0].bodyA.label;
        var objB = pairs[0].bodyB.label;

        if (objA === 'floor' && objB === 'debris') {
            Matter.Body.setPosition(pairs[0].bodyB, {
                x: randomInt(1, width - 30),
                y: randomInt(0, 200)
            });

            this.setState(state => {
                const newScore = state.score + 1;

                // Calcular novos pontos de diversão
                const newFunPoints = Math.floor(newScore / 2); 
                if (newFunPoints > state.funPoints) {
                    if (this.updateFun) {
                        this.updateFun(prevFun => Math.min(prevFun + 1, 100)); 
                    }

                    return {
                        score: newScore,
                        funPoints: Math.min(newFunPoints, 10), 
                        hasFunPointsAdded: false 
                    };
                }

                return { score: newScore };
            });
        }

        if (objA === 'ball' && objB === 'debris') {
            this.setState({ isGameOver: true });
            this.debris.forEach((debris) => {
                Matter.Body.set(debris, { isStatic: true });
            });
        }
    });
};

  reset = () => {
    this.debris.forEach((debris) => {
      Matter.Body.set(debris, { isStatic: false });
      Matter.Body.setPosition(debris, {
        x: randomInt(1, width - 30),
        y: randomInt(0, 200)
      });
    });

    this.setState({
      isGameOver: false,
      score: 0,
      hasFunPointsAdded: false
    });
  };

  goBack = () => {
    this.props.navigation.goBack(); 
  };

  render() {
    const { isGameReady, score, funPoints, isGameOver } = this.state;

    if (isGameReady) {
      return (
        <ImageBackground 
          source={require('../../../assets/sky.jpeg')}
          style={styles.background}
        >
          <GameEngine
            style={styles.container}
            systems={[this.physics]}
            entities={this.entities}
          >
            <View style={styles.header}>
              <Text style={styles.scoreText}>Pontuação: {score}</Text>
              <Text style={styles.funText}>Diversão: {funPoints}</Text>
            </View>

            {isGameOver && (
              <View style={styles.gameOverContainer}>
                <Text style={styles.gameOverText}>Game Over</Text>
                <Text style={styles.finalScoreText}>Pontuação final: {score}</Text>
                <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.restartButton} 
                    onPress={this.reset}
                  >
                    <Text style={styles.restartButtonText}>Jogar Novamente</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={this.goBack}
                  >
                    <Text style={styles.backButtonText}>Voltar</Text>
                  </TouchableOpacity>
                  
                </View>
              </View>
            )}
          </GameEngine>
        </ImageBackground>
      );
    }

    return null;
  }
}  

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  scoreText: {
    fontSize: 20,
    color: 'black',
  },
  funText: {
    fontSize: 20,
    color: 'black',
  },
  gameOverContainer: {
    position: 'absolute',
    top: height / 2 - 120, 
    left: width / 2 - 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  gameOverText: {
    fontSize: 30,
    color: 'white',
  },
  finalScoreText: {
    fontSize: 20,
    color: 'white',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#43514A',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  restartButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3a5949', 
    borderRadius: 5,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
  },
});


