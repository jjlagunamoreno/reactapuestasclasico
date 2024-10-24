import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import NotFound from './NotFound'


export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
