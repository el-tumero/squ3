interface lettersCordsPair {
    [key: string]: Array<number>;
}
 

export default class Letters{

    private alphabet:string = 'abcdefghijklmnoprstuwyxz_'

    private letterSize:number = 32

    private sprite:HTMLImageElement = new Image()

    private lettersCords:lettersCordsPair = {}

    constructor(){
        this.setSprite()
        this.setCords()
    }

    public getCords(letter:string):Array<number>{
        return this.lettersCords[letter as string]
    }

    public getSprite():HTMLImageElement{
        return this.sprite
    }

    private setSprite():void{
        const lettersTexture:HTMLImageElement = new Image()
        lettersTexture.src = "../assets/graphics/ui/letters.png"
        this.sprite = lettersTexture
    }

    private setCords():void{
        for (let i = 0; i < this.alphabet.length; i++) {
            this.lettersCords[this.alphabet[i]] = [(i - Math.floor(i/8)*8)*this.letterSize, Math.floor(i/8)*this.letterSize]
        }
    }
}