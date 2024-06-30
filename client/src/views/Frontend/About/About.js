import React from "react";
import Main from "../../../GeneralComponents/Main";
import Container from "../../../MainLayouts/Container";
import {
  Story,
  Team,
  WhoWeAre,
} from './components';

const About = () => {
  return (
    <Main colorInvert={true}>
      <Container>
        <Story />
      </Container>
      <Container paddingTop={'0 !important'}>
        <WhoWeAre />
      </Container>
      <Container>
        <Team />
      </Container>
    </Main>
  );
};

export default About;
