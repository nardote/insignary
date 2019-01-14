import { observable } from 'mobx'
import userStore from './stores/userStore'
import fileDetailStore from './stores/fileDetailStore'
import routerStore from './stores/routerStore'


// Default state structure
// Everything that defines our application and that could be
// shared between components should be declared here.
const defaultState = observable({
    app: {
        title: 'Insignary'
    },
    user: new userStore(),
    breadCrumbs:{},
    fileDetail:new fileDetailStore(),
    routerState: new routerStore()
    
})

export default defaultState;