
import 'regenerator-runtime/runtime'
import React from 'react';
React.useLayoutEffect = React.useEffect
import Enzyme, {render} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { renderToJson } from 'enzyme-to-json';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'

import { MainContainer } from '../MainContainer';
import  {store} from "../../redux/index"
import {Provider} from "react-redux";

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureMockStore([thunk]);

describe('main tests', () => {
    it('main container snapshot', () => {

        const store = mockStore(store);

        const mainContainer =  render(
            <Provider store={store}>
                <MainContainer />
            </Provider>
        )


        expect(renderToJson(mainContainer)).toMatchSnapshot();
    });
});

