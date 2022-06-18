import * as React from "react";
import { tripx } from "../../../../declarations/tripx";
import { Principal } from '@dfinity/principal';
import {
  Alert,
  Form,
  Button,
  Table,
  Container,
  Row
} from 'react-bootstrap';
import {
  coreService
} from '../../core/service'
import './mint.css'

const Mint = () => {
  const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)
  const [tokenMetadatas, setTokenMetadatas] = React.useState([])

  function createNftMetadata({url, description}) {
    if (!url) {
        throw new Error(`Failed to mint: url is invalid: ${url}`);
    }
    const encoder = new TextEncoder();
    const mintNftData = {url: url, description: description};
    const metadataBlob = encoder.encode(JSON.stringify(mintNftData));
  
    return [Array.from(metadataBlob)];
  }

  function reset() {
    setShowAlert(false)
    setError('')
    setSuccess('')
  }

  async function doMintNFT(e) {
    e.preventDefault()
    reset()
    if (!url || !description) {
      setError('url or description is invalid!')
      setShowAlert(true)
      return
    }
    const metadata = createNftMetadata({url, description})
    const payload = {
      to: {principal: Principal.fromText(coreService.getConfig('minterPrincipal'))},
      metadata
    }
  
    const tokenId = await tripx.mintNFT(payload);
    setShowAlert(true)
    setSuccess(`succesfully minted. Token ID: ${tokenId}`)
  }

  const showTokenMetadata = async (e) => {
    e.preventDefault()
    reset()
    const tokenMetadatas = await tripx.getTokens()
    if (tokenMetadatas?.length === 0) {
      setError('no token metadata to be shown!')
      setShowAlert(true)
      return;
    }

    const decoder = new TextDecoder();
    let tokenMetadataList = []
    for (let i = 0; i < tokenMetadatas?.length; i += 1) {
      const tokenMetadata = tokenMetadatas[i][1]?.nonfungible?.metadata[0]
      tokenMetadataList.push(JSON.parse(decoder.decode(new Uint8Array(tokenMetadata))))
    }

    setTokenMetadatas(tokenMetadataList)
  }

  return (
    <Container className='pt-4' style={{minHeight: '100vh', background: '#eeeeee'}} fluid>
      <Row style={{flexDirection: 'column'}} className='pb-4'>
        <span style={{fontWeight: 'bold', fontSize: '24px'}}>Welcome to Minter Area</span>
        <span style={{fontWeight: '300', fontSize: '14px'}}>
          {`You can use this page to minting the NFT and see minted NFT list!`}
        </span>
      </Row>
      <Row className='px-4 pt-4 mint-box' style={{display: 'block', margin: 'auto'}}>
        {showAlert ? 
          <Alert className="mt-4" key={error ? 'danger': 'success'} variant={error ? 'danger': 'success'}>
            {error ? error : success}
          </Alert> : null
        }
        <Form style={{flexDirection: 'column', alignItems: 'center', marginTop: '3rem'}}>
          <Form.Group className="mb-3" controlId="formBasicUrl">
            <Form.Label>URL</Form.Label>
            <Form.Control type="text" placeholder="Enter URL" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            />
            <Form.Text className="text-muted">
              Please input image's URL
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Text className="text-muted">
              Please input image's description
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={doMintNFT}>
            Mint your NFT!
          </Button>
        </Form>
      </Row>
      <Row style={{flexDirection: 'column'}} className='pb-4 pt-4'>
        <span style={{fontWeight: 'bold', fontSize: '24px'}}>Minted NFT List</span>
        <span style={{fontWeight: '300', fontSize: '14px'}}>
          {`Please click button below to show Minted NFT list!`}
        </span>
      </Row>
      <div className="minted-list-box" style={{display: 'flex', flexDirection: 'column'}}>
        <Button variant="primary" type="submit" onClick={showTokenMetadata}>
          Show Minted NFT List
        </Button>
        {tokenMetadatas?.length > 0 ? 
          <Table responsive>
            <thead>
              <tr>
                <th>Token ID</th>
                <th>URL</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {            
                tokenMetadatas?.map((tokenMetadata, i) => (
                  <tr key={i}>
                    <td>
                      <span>{i}</span>
                    </td>
                    <td>
                      <span>{tokenMetadata?.url}</span>
                    </td>
                    <td>
                      <span>{tokenMetadata?.description}</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table> : null
        }
      </div>
    </Container>
  );
}

export default Mint;