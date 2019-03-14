import React, {Component} from 'react';
import views from './views';
import {Route} from 'react-router-dom';
import style from './index.module.styl';
import Header from './components/public/header/container';
import Footer from './components/public/footer';

class App extends Component{
        render(){
                return (
                        <div className={style.wrapper}>
                                <div className={style.header}><Header/></div>
                                <div className={style.content}>
                                        <Route path='/' component={views.Home} exact/>
                                        <Route path='/category' component={views.Category}/>
                                        <Route path='/cart' component={views.Cart}/>
                                        <Route path='/center' component={views.Center}/>
                                </div>
                                <div className={style.footer}><Footer/></div>
                        </div>
                );
        }
}

export default App;
