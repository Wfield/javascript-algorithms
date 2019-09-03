import TrieNode from './TrieNode';

const HEAD_CHARACTER = '*';

export default class Trie {
  
  head: TrieNode;

  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  addWord(word:string):Trie {
    const characters = Array.from(word);
    let currentNode = this.head;

    for(let charIndex = 0; charIndex < characters.length; charIndex++) {
      const isComplete = charIndex === characters.length - 1;
      currentNode = currentNode.addChild(characters[charIndex], isComplete);
    }

    return this;
  }

  deleteWord(word:string):Trie {
    const depthFirstDelete = (currentNode:TrieNode, charIndex:number = 0) => {
      if(charIndex >= word.length) {
        // 如果试图删除超过 word 以外的，则返回
        return;
      }

      const character = word[charIndex];
      const nextNode = currentNode.getChild(character);
      
      if(nextNode === null) {
        return;
      }

      depthFirstDelete(nextNode, charIndex + 1);

      if(charIndex === (word.length - 1)) {
        nextNode.isComplete = false;
      }

      currentNode.removeChild(character);
    };

    depthFirstDelete(this.head);
  
    return this;
  }

  suggestNextCharacters(word:string):string[] {
    const lastCharacter = this.getLastCharacterNode(word);
    if(!lastCharacter) {
      return null;
    }

    return lastCharacter.suggestChildren();
  }

  doseWordExist(word:string):boolean {
    const lastCharacter = this.getLastCharacterNode(word);

    return !!lastCharacter && lastCharacter.isComplete;
  }

  getLastCharacterNode(word:string):TrieNode {
    const characters = Array.from(word);
    let currentNode = this.head;

    for(let charIndex = 0 ; charIndex <characters.length; charIndex ++) {
      if(!currentNode.hasChild(characters[charIndex])) {
        return null;
      }

      currentNode = currentNode.getChild(characters[charIndex]);
    }

    return currentNode;
  }
}
