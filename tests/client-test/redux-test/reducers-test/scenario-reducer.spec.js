/*  eslint-env mocha */
import { expect } from 'chai';
import { scenarioReducer } from '../../../../client/redux/reducers/scenario-reducer';
import * as scenarioAction from '../../../../client/redux/actionCreators/scenario-actions';

describe('Redux Scenario Reducers', () => {
  const initialState = {
    allScenarios: [],
    currentScenarioID: 0,
    currentSpawnsCount: 0,
    currentWorkers: 0,
    currentTargetURL: '',
    currentScenarioName: '',
    isValidScript: false,
    attemptedCheck: false,
    completion: false,
    isVerifiedOwner: false,
  };

  it('should return an initial state ', () => {
    const newState = scenarioReducer(undefined, {});

    expect(newState).to.deep.equal(initialState);
  });

  it('should set an array of scenarios to allScenarios state', () => {
    const fakeData = {
      scenarios: JSON.stringify([
        { scenarioName: 'Test One', targetURL: 'http://www.google.com' },
        { scenarioName: 'Test Two', targetURL: 'http://wwww.facebook.com' },
        { scenarioName: 'Test Three', targetURL: 'http://www.twitter.com' },
      ]),
    };

    const newState = scenarioReducer(initialState, scenarioAction.allScenarios(fakeData));

    expect(initialState.allScenarios).to.be.empty;
    expect(newState.allScenarios).to.have.length(3);
    expect(newState.allScenarios[1].scenarioName).to.equal('Test Two');
  });

  it('should set attemptedCheck to true when checking for valid script', () => {
    const newState = scenarioReducer(initialState, scenarioAction.validScript());

    expect(initialState.isValidScript).to.be.false;
    expect(initialState.attemptedCheck).to.be.false;
    expect(newState.isValidScript).to.be.true;

    const nextState = scenarioReducer(newState, scenarioAction.invalidScript());

    expect(nextState.isValidScript).to.be.false;
    expect(nextState.attemptedCheck).to.be.true;
  });

  it('should reset attemptedCheck and isValid script to false on reset', () => {
    const newState = scenarioReducer(initialState, scenarioAction.validScript());

    expect(initialState.isValidScript).to.be.false;
    expect(initialState.attemptedCheck).to.be.false;

    const nextState = scenarioReducer(newState, scenarioAction.resetCheck());

    expect(newState.isValidScript).to.be.true;
    expect(nextState.isValidScript).to.be.false;
    expect(nextState.attemptedCheck).to.be.false;
  });

  it('should set current scenario information to state', () => {
    const fakeData = {
      scenarioID: 2,
      spawnsCount: 1000,
      workers: 5,
      targetURL: 'felixfeng.com',
      scenarioName: 'Attack of the tests',
    };

    const newState = scenarioReducer(initialState, scenarioAction.storeRecentScenarioInfo(fakeData));

    expect(initialState.currentScenarioID).to.equal(0);
    expect(initialState.currentSpawnsCount).to.equal(0);
    expect(initialState.currentWorkers).to.equal(0);
    expect(initialState.currentTargetURL).to.equal('');

    expect(newState.currentScenarioID).to.equal(2);
    expect(newState.currentSpawnsCount).to.equal(1000);
    expect(newState.currentWorkers).to.equal(5);
    expect(newState.currentTargetURL).to.equal('felixfeng.com');
    expect(newState.currentScenarioName).to.equal('Attack of the tests');
  });
});
