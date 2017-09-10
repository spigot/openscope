import _has from 'lodash/has';
import _isNil from 'lodash/isNil';
import EventBus from '../lib/EventBus';
import NavigationLibrary from '../navigationLibrary/NavigationLibrary';
import RadarTargetCollection from './RadarTargetCollection';
import UiController from '../UiController';
import { THEME } from '../constants/themes';
import { EVENT } from '../constants/eventNames';

export default class ScopeModel {
    constructor(aircraftCollection) {
        this._aircraftCollection = [];
        this._eventBus = EventBus;
        this._navigationLibrary = NavigationLibrary;
        // TODO: Use this!
        this._sectorCollection = [];
        this._theme = THEME.DEFAULT;

        this.radarTargetCollection = [];

        this._init(aircraftCollection);
    }

    /**
     * Complete initialization tasks
     *
     * @for ScopeModel
     * @method _init
     * @param aircraftCollection {array}
     */
    _init(aircraftCollection) {
        this._aircraftCollection = aircraftCollection;
        this.radarTargetCollection = new RadarTargetCollection(this._theme, aircraftCollection);
    }

    /**
     * Accept a pending handoff from another sector
     *
     * @for ScopeModel
     * @method acceptHandoff
     * @param radarTargetModel {RadarTargetModel}
     * @param commandArguments {array}
     * @return result {array} [success of operation, system's response]
     */
    acceptHandoff(radarTargetModel, commandArguments) {
        // TODO: Make this do stuff!
        UiController.ui_log('acceptHandoff command not yet available', true);

        return [true, `user input received: '${commandArguments}'`];
    }

    /**
     * Amend the cruise altitude OR interim altitude for a given `RadarTargetModel`
     *
     * @for ScopeModel
     * @method amendAltitude
     * @param radarTargetModel {RadarTargetModel}
     * @param commandArguments {array}
     * @return result {array} [success of operation, system's response]
     */
    amendAltitude(radarTargetModel, commandArguments) {
        // TODO: Make this do stuff!
        UiController.ui_log('amendAltitude command not yet available', true);

        return [true, `user input received: '${commandArguments}'`];
    }

    /**
     * Enable handlers
     *
     * @for ScopeModel
     * @method disable
     */
    disable() {
        this._eventBus.off(EVENT.SET_THEME, this._setTheme);
    }

    /**
     * Disable handlers
     *
     * @for ScopeModel
     * @method enable
     */
    enable() {
        this._eventBus.on(EVENT.SET_THEME, this._setTheme);
    }

    /**
     * Initiate a handoff to another sector
     *
     * @for ScopeModel
     * @method handoff
     * @param radarTargetModel {RadarTargetModel}
     * @param commandArguments {array}
     * @return result {array} [success of operation, system's response]
     */
    handoff(radarTargetModel, commandArguments) {
        // TODO: Make this do stuff!
        UiController.ui_log('handoff command not yet available', true);

        return [true, `user input received: '${commandArguments}'`];
    }

    /**
     * Change direction and/or length of data block leader line
     *
     * @for ScopeModel
     * @method moveDataBlock
     * @param radarTargetModel {RadarTargetModel}
     * @param commandArguments {array}
     * @return result {array} [success of operation, system's response]
     */
    moveDataBlock(radarTargetModel, commandArguments) {
        return radarTargetModel.moveDataBlock(commandArguments);
    }

    /**
     * Toggle visibility of the data block of a given `RadarTargetModel`, on this
     * sector's scope, or the scope of another sector
     *
     * @for ScopeModel
     * @method propogateDataBlock
     * @param radarTargetModel {RadarTargetModel}
     * @param commandArguments {array}
     * @return result {array} [success of operation, system's response]
     */
    propogateDataBlock(radarTargetModel, commandArguments) {
        // TODO: Make this do stuff!
        UiController.ui_log('propogateDataBlock command not yet available', true);

        return [true, `user input received: '${commandArguments}'`];
    }

    /**
     * Amend the route stored in the scope for a given `RadarTargetModel`
     *
     * @for ScopeModel
     * @method route
     * @param radarTargetModel {RadarTargetModel}
     * @param commandArguments {array}
     * @return result {array} [success of operation, system's response]
     */
    route(radarTargetModel, commandArguments) {
        // TODO: Make this do stuff!
        UiController.ui_log('route command not yet available', true);

        return [true, `user input received: '${commandArguments}'`];
    }

    /**
     * Execute a scope command from a `ScopeCommandModel`
     * @method runScopeCommand
     * @param scopeCommandModel {ScopeCommandModel}
     */
    runScopeCommand(scopeCommandModel) {
        const functionName = scopeCommandModel.commandFunction;
        const functionArguments = scopeCommandModel.commandArguments;
        const radarTargetModel = this.radarTargetCollection.getRadarTargetModelFromAircraftReference(
            scopeCommandModel.aircraftReference
        );

        if (!_has(this, functionName)) {
            return [false, 'ERR: BAD SYNTAX'];
        }

        if (_isNil(radarTargetModel)) {
            return [false, 'ERR: UNKNOWN AIRCRAFT'];
        }

        return this[functionName](radarTargetModel, ...functionArguments);
    }

    /**
     * Amend the scratchpad for a given `RadarTargetModel`
     *
     * @for ScopeModel
     * @method setScratchpad
     * @param radarTargetModel {RadarTargetModel}
     * @param commandArguments {array}
     * @return result {array} [success of operation, system's response]
     */
    setScratchpad(radarTargetModel, commandArguments) {
        return radarTargetModel.setScratchpad(commandArguments);
    }

    /**
     * Toggle halo for a given `RadarTargetModel`
     *
     * @for ScopeModel
     * @method toggleHalo
     * @param radarTargetModel {RadarTargetModel}
     * @param commandArguments {array}
     * @return result {array} [success of operation, system's response]
     */
    toggleHalo(radarTargetModel, commandArguments) {
        return radarTargetModel.toggleHalo(commandArguments);
    }

    /**
     * Change theme to the specified name
     *
     * This should ONLY be called through the EventBus during a `SET_THEME` event,
     * thus ensuring that the same theme is always in use by all app components.
     *
     * This method must remain an arrow function in order to preserve the scope
     * of `this`, since it is being invoked by an EventBus callback.
     *
     * @for ScopeModel
     * @method _setTheme
     * @param themeName {string}
     */
    _setTheme = (themeName) => {
        if (!_has(THEME, themeName)) {
            console.error(`Expected valid theme to change to, but received '${themeName}'`);

            return;
        }

        this._theme = THEME[themeName];
    }
}
