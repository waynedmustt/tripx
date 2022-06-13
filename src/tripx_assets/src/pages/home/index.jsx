import * as React from "react";
import { tripx } from "../../../../declarations/tripx";
import { Principal } from '@dfinity/principal';

const Home = () => {
  const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [error, setError] = React.useState('');
  const [tokenId, setTokenId] = React.useState('')
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

  async function doMintNFT() {
    if (!url || !description) {
      setError('url or description is invalid!')
      return
    }
    const metadata = createNftMetadata({url, description})
    const payload = {
      to: {principal: Principal.fromText('fucqx-yitaz-ukmrj-vzyr4-b4v4n-molxb-f7ejl-mggj6-zgo2l-uxjsv-eae')},
      metadata
    }
  
    const tokenId = await tripx.mintNFT(payload);
    setTokenId(tokenId)
  }

  const showTokenMetadata = async () => {
    const tokenMetadatas = await tripx.getTokens()
    if (tokenMetadatas?.length === 0) {
      setError('no token metadata to be shown!')
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
    <div style={{ "fontSize": "30px" }}>
      <div style={{ "backgroundColor": "yellow" }}>
        <p>Greetings, from DFINITY!</p>
      </div>
      <div style={{ margin: "30px" }}>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button onClick={doMintNFT}>mint NFT!</button>
      </div>
      <div>
        {error ? error : tokenId}
      </div>
      <div style={{ margin: "30px" }}>
        <button onClick={showTokenMetadata}>show token metadata!</button>
        <div>
          {error ? error :
          <li>
            {            
              tokenMetadatas?.map((tokenMetadata, i) => (
                <React.Fragment key={i}>
                  <ul>{tokenMetadata?.url}</ul>
                  <ul>{tokenMetadata?.description}</ul>
                </React.Fragment>
              ))
            }
          </li> 
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
