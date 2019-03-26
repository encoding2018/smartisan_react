import React, {Component} from 'react';
import views from './views';
import {Route} from 'react-router-dom';
import Alert from './components/public/alert';
import style from './index.module.styl';
import Header from './components/public/header/container';
import Footer from './components/public/footer';
class App extends Component{
        render(){
                return (
                        <>
                                <div className={style.wrapper}>
                                        <Header/>
                                        <div className={style.content}>
                                                <Route path='/' component={views.Home} exact/>
                                                <Route path='/category' component={views.Category} exact/>
                                                <Route path='/cart' component={views.Cart} exact/>
                                                <Route path='/center' component={views.Center} exact/>
                                                <Route path='/index/floor/:id' component={views.Floor} exact/>
                                                <Route path='/category/list/:id' component={views.Floor} exact/>
                                                <Route path='/product/:id' component={views.Product} exact/>
                                                <Route path='/user/login' component={views.Login} exact/>
                                                <Route path='/user/register' component={views.Register} exact/>
                                                <Route path='/user/change' component={views.ChangePwd} exact/>
                                                <Route path='/user/details' component={views.Details} exact/>
                                                <Route path='/site' component={views.Site} exact/>
                                                <Route path='/site/change' component={views.SiteChange} exact/>
                                        </div>
                                        <Footer/>
                                </div>
                                <Alert/>
                        </>
                );
        }
}

export default App;
