import React, {Component} from 'react';
import TreeView from 'react-treeview';
import uuid from 'uuid'
import FileDetail from '../FileDetail/FileDetail';
import { observer } from 'mobx-react';

import 'react-treeview/react-treeview.css';
import './ScanResult.css';
import api from '../../api'



import folder from '../../images/icons/folder.png';
import file from '../../images/icons/file.png';  



@observer(['state'])
class componentName extends Component {
    constructor(props){
        super(props)
        this.makeFolderStruct = this.makeFolderStruct.bind(this)
        this.makeFileStruct = this.makeFileStruct.bind(this)
        this.defineStruct = this.defineStruct.bind(this)
       // this.handleClick = this.handleClick.bind(this)

        this.state = { tree: {}, fileDetailId:{} }

     
    }
    componentWillMount(){
        
        api.getTreeScannedReport(this.props.state.user.access_token,this.props.routeParams.idReport)
            .then((response)=>{
                this.setState({
                    tree: {
                            name: '/root',
                            type: 'folder',
                            id:'-1',
                            children: response.response
                    }
                })
            })
        
    }
    handleClick (node) {
        
        this.props.state.fileDetail.setFile(node, this.props.routeParams.idReport, this.props.state.user.access_token)
        this.props.state.routerStore.addRouter(node.name,'')
       
    }
    //define si es archivo o carpeta
    defineStruct (node) {      
        if(node.type === 'folder') {            
            return this.makeFolderStruct(node)
        } else {
            return this.makeFileStruct(node)
        }
    }
    //arma un nodo tipo archivo
    makeFileStruct (node) {             
        return <div key={uuid.v1()} id={node.id} className="node-file" onClick={this.handleClick.bind(this, node)} ><img src={file} role="presentation" /> {node.name}</div>
    }
    //arma un nodo tipo carpeta y recorre su interior
    makeFolderStruct(node) {
        const folderLabel = <span className="node"><img src={folder} role="presentation" /> {node.name}</span>;    
        if(node.children) { 
            return (
                <TreeView defaultCollapsed={true} nodeLabel={folderLabel} key={uuid.v1()} id={node.id}>             
                    {node.children.map(child => {                          
                        return(this.defineStruct(child));
                    })}
                </TreeView>
            )
                    
        } else {
            return (
                <TreeView nodeLabel={folderLabel} key={uuid.v1()} id={node.id}>             
                    <div className="info">Empty folder</div>
                </TreeView>
            )
        }
    }
    render() {
        
        return (
            <div className="scan-result">
                <div className="row">
                    <div className="column column-50">
                        <h5>Tree</h5>
                        {this.defineStruct(this.state.tree)}
                    </div>
                    <div className="column column-50">                    
                        <FileDetail />
                    </div>
                </div>
            </div>
        );
    }
}

export default componentName;
