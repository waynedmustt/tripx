import * as React from "react";
import { tripx } from "../../../../declarations/tripx";
import { Principal } from '@dfinity/principal';
import {
  Alert,
  Form,
  Button,
  Table,
} from 'react-bootstrap';

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
      to: {principal: Principal.fromText('fucqx-yitaz-ukmrj-vzyr4-b4v4n-molxb-f7ejl-mggj6-zgo2l-uxjsv-eae')},
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
    <React.Fragment>
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
      <Form style={{flexDirection: 'column'}}>
        <Button variant="primary" type="submit" onClick={showTokenMetadata}>
          Show Token MetaData
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
      </Form>
    </React.Fragment>
  );
}

export default Mint;