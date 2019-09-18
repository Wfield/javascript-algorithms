import HashTable from '../HashTable/HashTable';

export default class TrieNode {

  character: string;
  isComplete: boolean;
  children: HashTable;

  constructor(character:string = null, isComplete:boolean = false) {
    this.character = character;
    this.isComplete = isComplete;
    this.children = new HashTable();
  }

  getChild(character:string):TrieNode {
    return this.children.get(character);
  }

  addChild(character:string, isCompleteWord:boolean = false):TrieNode {
    if(!this.children.get(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    const childNode = this.children.get(character);
    childNode.isComplete = childNode.isComplete || isCompleteWord;

    return childNode;
  }

  removeChild(character:string):TrieNode {
    const childNode = this.getChild(character);

    // Delete childNode only if:
    // - childNode has NO children,
    // - childNode.isCompleteWord === false.
    if(childNode && !childNode.isComplete && !childNode.hasChildren()) {
      this.children.delete(character);
    }

    return this;
  }

  hasChild(character:string):boolean {
    return this.children.has(character);
  }

  hasChildren():boolean {
    return this.children.getKeys().length !== 0;
  }

  suggestChildren():any[] {
    return [...this.children.getKeys()];
  }

  toString():string {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` :'';
    const isCompleteString = this.isComplete ? '*' : '';
    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
