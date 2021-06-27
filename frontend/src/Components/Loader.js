import { Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import smallIcon from '../Resources/MailMonk.png';

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.05);
    z-index: 100;
    overflow: hidden;
`;

const animation = keyframes`
0% {
    transform: scale(0.5);
    opacity: 0;
}
50% {
    opacity: 1;
}
100% {
    transform: scale(1.2);
    opacity: 0;
}
`;

const MiddleImage = styled.img`
    width: calc(100%);
    height: calc(100%);
    position: absolute;
    background-color: white;
    border-radius: 100px;
    object-fit: contain;
    z-index: 15;
    box-shadow: 1px 1px 4px 3px #b8c1ff;
`;

const MiddleImgContainer = styled.div`
    width: 120px;
    height: 120px;
    background-color: white;
    box-shadow: 1px 1px 4px 3px #b8c1ff;
    border-radius: 100px;
    position: relative;
    z-index: 12;

    :before, :after {
        animation: ${animation} 1.5s linear infinite;

        content: "";
        display: block;
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border: 1px solid #03045E;
        border-radius: 50%;
        opacity: 0;
        z-index: 10;
    }

    :after {
        animation-delay: 0.5s;
    }
`;

function Loader(props){
    return(
        <Fragment>
            {props.show &&
                <MainContainer>
                    <MiddleImgContainer>
                        <MiddleImage src={smallIcon} />
                    </MiddleImgContainer>
                </MainContainer>
            }
        </Fragment>
    );
}

export default Loader;
