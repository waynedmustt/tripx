import { tripx } from "../../declarations/tripx";
import { Principal } from '@dfinity/principal';

function createNftMetadata({url, description}) {
  if (!url) {
      throw new Error(`Failed to mint: url is invalid: ${url}`);
  }
  const encoder = new TextEncoder();
  const mintNftData = {url: url, description: description};
  const metadataBlob = encoder.encode(JSON.stringify(mintNftData));

  return [Array.from(metadataBlob)];
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const url = 'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg';
  const description = document.getElementById("description").value.toString();
  const metadata = createNftMetadata({url, description})

  const payload = {
    to: {principal: Principal.fromText('fucqx-yitaz-ukmrj-vzyr4-b4v4n-molxb-f7ejl-mggj6-zgo2l-uxjsv-eae')},
    metadata
  }

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const tokenId = await tripx.mintNFT(payload);

  button.removeAttribute("disabled");

  document.getElementById("tokenId").innerText = tokenId;

  return false;
});

document.getElementById('showToken').addEventListener('click', async (e) => {
  e.preventDefault()
  const tokenMetadatas = await tripx.getTokens()
  if (tokenMetadatas?.length === 0) {
    return false;
  }

  const decoder = new TextDecoder();
  let tokenMetadataList = []
  for (let i = 0; i < tokenMetadatas?.length; i += 1) {
    const tokenMetadata = tokenMetadatas[i][1]?.nonfungible?.metadata[0]
    tokenMetadataList.push(JSON.parse(decoder.decode(new Uint8Array(tokenMetadata))))
  }

  let renderedHtml = '<li>'

  for (let j = 0; j < tokenMetadataList?.length; j += 1) {
    renderedHtml += `<ul>${tokenMetadataList[j]?.url}</ul>` +
    `<ul>${tokenMetadataList[j]?.description}</ul>`
  }

  renderedHtml += `</li>`

  document.getElementById('tokenMetadatas').innerHTML = renderedHtml 
})
