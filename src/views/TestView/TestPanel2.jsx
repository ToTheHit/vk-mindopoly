import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, SimpleCell } from '@vkontakte/vkui';
import axios from 'axios';
import SimpleCrypto from "simple-crypto-js"

const TestPanel2 = (props) => {
  const { setActivePanel, id } = props;
  const simpleCrypto = new SimpleCrypto('jopa_industries');

  useEffect(() => {
    console.info(simpleCrypto.decrypt('83d1de26c67d6646a85d48c44afcd2809e6d28aac45079a54ab008d2e9dc2bcb4+7sO9SDZHIqwKRh/I89HL2nnbbSmhu8AFOiftY2bHY=f65b3cd174c5066439dbb84acc26e569c1b77eb761beb3abceffa1b2ecf21c1f'));
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>
        Development View #2
      </PanelHeader>
      <SimpleCell
        onClick={() => {
          setActivePanel('1');
        }}
      >
        Go to View #1
      </SimpleCell>
    </Panel>
  );
};

TestPanel2.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,

};
TestPanel2.defaultProps = {};
export default TestPanel2;
