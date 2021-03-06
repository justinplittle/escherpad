import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
    background-color: #efefef;
    width: 256px;
`;
export default function BindrBar(props) {
    return (
        <Styled fill row {...props}>
            <FlexItem fixed/>
        </Styled>
    );
}
