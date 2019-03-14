import main from '../presitational';
import {connect} from 'react-redux';

function mapStateToProps({template}){
        return{
                navState:template
        }
}

export default connect(mapStateToProps)(main);