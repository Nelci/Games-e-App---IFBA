// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _acelerando: false,
        _direcao: cc.Vec2,
        tiroPrefab: cc.Prefab,
        velocidade: 200,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.mudarDirecao, this);
        canvas.on("mousedown", this.atirar, this);
        cc.director.getCollisionManager().enabled = true;
        if ('touches' in cc.sys.capabilities) {
            canvas.on(cc.Node.EventType.TOUCH_START, this.mudarDirecao, this);
            canvas.on(cc.Node.EventType.TOUCH_MOVE, this.mudarDirecao, this);
            canvas.on(cc.Node.EventType.TOUCH_END, this.atirar, this)
        }
    },

    atirar: function (event) {

        let tiro = cc.instantiate(this.tiroPrefab);
        tiro.parent = this.node.parent;
        tiro.position = this.node.position;

        let componenteTiro = tiro.getComponent("Tiro");
        componenteTiro.direcao = this._direcao;
    },

    mudarDirecao: function (event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        let direcao = posicaoMouse.sub(this.node.position);
        direcao = direcao.normalize();
        this._direcao = direcao;

    },

    teclaPressionada: function (event) {
        if (event.keyCode == cc.macro.KEY.a) {
            this._acelerando = true;
        }

    },

    teclaSolta: function (event) {
        if (event.keyCode == cc.macro.KEY.a) {
            this._acelerando = false;
        }

    },

    //start () {},

    update: function (dt) {
        if (this._acelerando) {
            this.node.position = this.node.position.add(this._direcao);

        }

    },
});
