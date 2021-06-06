pragma solidity >=0.4.21 <0.7.0;

contract Storage {

  string public name = 'DStorage';
  mapping(uint => File) public files;
  uint public fileCount = 0;
  
  struct File {
      uint fileId;
      string fileHash;
      uint fileSize;
      string fileType;
      string fileName;
      string fileDesc;
      uint uploadTime;
      address payable uploader;
  }

  constructor() public {

  }
  
  event FileUploaded(
      uint fileId,
      string fileHash,
      uint fileSize,
      string fileType,
      string fileName,
      string fileDesc,
      uint uploadTime,
      address payable uploader
  );
  
  function uploadFile(
      string memory _hash,
      uint _size,
      string memory _type,
      string memory _name,
      string memory _desc
  ) 
  public{
      require(bytes(_hash).length > 0);
      require(bytes(_type).length > 0);
      require(bytes(_desc).length > 0);
      require(bytes(_name).length > 0);
      require(_size > 0);
      require(msg.sender != address(0));
      
      fileCount++;
      uint id = fileCount+block.timestamp;
      files[fileCount] = File(id, _hash, _size, _type, _name, _desc, block.timestamp, msg.sender);
      
      emit FileUploaded(id, _hash, _size, _type, _name, _desc, block.timestamp, msg.sender);
  }

}
