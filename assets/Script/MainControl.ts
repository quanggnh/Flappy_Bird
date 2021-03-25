// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AudioSourceControl, { SoundType } from "./AudioSourceControl";

const {ccclass, property} = cc._decorator;
export enum GameStatus{
    Game_Ready = 0,
    Game_Playing,
    Game_Over
}
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)

    spBg: cc.Sprite []= [null,null];

    spGameOver: cc.Sprite = null ; 

    btnStart: cc.Button = null;

    gameStatus: GameStatus = GameStatus.Game_Ready;

    @property(cc.Label)

    labelScore: cc.Label = null;

    gameScore: number = 0;

    @property(AudioSourceControl)
    audioSourceControl: AudioSourceControl = null;
    // LIFE-CYCLE CALLBACKS:
    gameOver(){
        this.spGameOver.node.active = true;
        //show the start button
        this.btnStart.node.active =true;
        //change game status to GameOver
        this.gameStatus=GameStatus.Game_Over;
        //play game over sound
        this.audioSourceControl.playSound(SoundType.E_Sound_Die);
    }
    touchStartBtn(){
        //hide start button
        this.btnStart.node.active = false;
        //set game status to playing
        this.gameStatus = GameStatus.Game_Playing;
        //hide Game Over 
        this.spGameOver.node.active=false;
        //reset pipes
        for(let i=0;i< this.pipe.length;i++){
            this.pipe[i].x=170+200*i;
            var minY = -120;
            var maxY= 120;
            this.pipe[i].y = minY + Math.random() * (maxY-minY)
        }
        //reset bird
        var bird = this.node.getChildByName("Bird");
        bird.y=0;
        bird.x = 0;
        //reset game score
        this.gameScore = 0;
        this.labelScore.string = this.gameScore.toString();
    }

    onLoad () {
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // collisionManager.enabledDebugDraw=true;
        this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
        this.spGameOver.node.active = false;
        this.btnStart=this.node.getChildByName("BtnStart").getComponent(cc.Button);
        this.btnStart.node.on(cc.Node.EventType.TOUCH_END, this.touchStartBtn,this);
    }
    @property(cc.Prefab)
    pipePrefab: cc.Prefab=null;

    pipe: cc.Node[]=[null,null,null]

    start(){
        for(let i = 0; i<this.pipe.length;i++){
            this.pipe[i] = cc.instantiate(this.pipePrefab);
            this.node.getChildByName("Pipe").addChild(this.pipe[i]);
            this.pipe[i].x = 170 + 200 * i;
            var minY = -120;
            var maxY = 120;
            this.pipe[i].y = minY + Math.random() * (maxY - minY);
        }
    }

    update (dt:number) {
        if(this.gameStatus !== GameStatus.Game_Playing){
            return;
        }
        for(let i = 0;i<this.spBg.length;i++){
            this.spBg[i].node.x -=1.0;
            if(this.spBg[i].node.x<=-288){
                this.spBg[i].node.x=288;
            }
        }
        //Move the pipes
        for(let i =0; i < this.pipe.length;i++){
            this.pipe[i].x -= 1.0;
            if(this.pipe[i].x <= -170){
                this.pipe[i].x = 430;
                var minY = -120;
                var maxY = 120;
                this.pipe[i].y = minY + Math.random() * (maxY - minY);  
            }
        }
    }
}
