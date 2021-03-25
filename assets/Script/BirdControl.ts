// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { SoundType } from "./AudioSourceControl";
import MainControl, { GameStatus } from "./MainControl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class BirdControl extends cc.Component {
    //Bird speed
    speed: number=0;
    mainControl: MainControl = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.mainControl = cc.Canvas.instance.node.getComponent("MainControl");
    }

    start () {

    }

    update (dt: number,) {
        if(this.mainControl.gameStatus==GameStatus.Game_Playing){
            this.speed -= 0.05;
            this.node.y += this.speed;
    
            var angle = -(this.speed/2)*30;
            if(angle>=30){
                angle = 30;
            }
            this.node.rotation=angle
        }
        else{
            this.speed = 0  
        }
    }
    onTouchStart(event: cc.Event.EventTouch){
        this.speed = 2;
        this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Fly);
    }
    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        if(other.tag === 0){
            cc.log("game over");
            this.mainControl.gameOver();
            this.speed = 0;
        }
        else if (other.tag === 1){
            this.mainControl.gameScore++;
            this.mainControl.labelScore.string = this.mainControl.gameScore.toString();
            this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Score)
        }
    }
}
