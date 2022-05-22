//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract Squ3Skins is ERC721URIStorage, ERC721Enumerable{
    uint256 public tokenCounter;

    constructor() ERC721("Squ3Skins", "SQ3S"){
        tokenCounter = 0;
    }

    function createCollectible(string memory _tokenURI) public returns (uint256) {
        uint256 newId = tokenCounter;
        _safeMint(msg.sender, newId);
        _setTokenURI(newId, _tokenURI);
        tokenCounter = tokenCounter + 1;
        return newId;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    
}