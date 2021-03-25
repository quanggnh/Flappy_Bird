// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export enum SoundType{
    E_Sound_Fly = 0,
    E_Sound_Score,
    E_Sound_Die
}
@ccclass
export default class AudioSourceControl extends cc.Component {
    @property({type:cc.AudioClip})
    backgroundMusic: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    flySound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    scoreSound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    dieSound: cc.AudioClip=null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.audioEngine.playMusic(this.backgroundMusic,true)
        cc.audioEngine.setMusicVolume(0.2)
    }

    playSound(type: SoundType){
        if (type == SoundType.E_Sound_Fly) {
            cc.audioEngine.playEffect(this.flySound, false);
        }
        else if (type == SoundType.E_Sound_Score) {
            cc.audioEngine.playEffect(this.scoreSound, false);
        }
        else if (type == SoundType.E_Sound_Die) {
            cc.audioEngine.playEffect(this.dieSound, false);
        }
    }

    // update (dt) {}
}
