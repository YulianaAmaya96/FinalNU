import React from 'react';
import { render } from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import iniSesion from './jsx/iniSesion.jsx';
import in from './jsx/index.jsx';
render(
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {iniSesion} />
            <Route path = '/catalogo' component = {in} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('in')
)
