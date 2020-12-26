import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import contract from '../../Contract/abi'
import Portis from '@portis/web3';
import Web3 from 'web3';

const Node = {
  nodeUrl: 'https://rpc-mumbai.matic.today',
  chainId: 80001,
};

const portis = new Portis('50420890-9e26-4e1d-8d95-1c02d245342d', Node);
const web3 = new Web3(portis.provider);

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  React.useEffect(() => {
    bal();
  });

  const bal = async event => {
    try {
      var bal = await web3.eth.getBalance(props.address);
      console.log('balance', bal)
      bal = web3.utils.fromWei(bal, 'ether');
      setBalance(bal);
    }
    catch (err) {
      console.log('Balance Update failed!')
    }
  }
  const classes = useStyles();
  const [balance, setBalance] = React.useState(0);

  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        {balance} Eth
      </Typography>
      <div>
      </div>
    </React.Fragment>
  );
}