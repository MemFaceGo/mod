var speed = 0.1;
var multiplier = 5;
const nuc = extendContent (ImpactReactor,"nuc-reactor",{
  setBars(){
    this.super$setBars();
    this.bars.add("heat",func(ent=>new Bar("bar.heat",Pal.lightOrange,floatp(()=>ent.getHeat()))));
  },
  update(tile){
    this.super$update(tile);
    var e = tile.ent();
    if(!e.items.has(this.consumes.get(ConsumeType.item).items)) return;
    try{
      var l = this.consumes.get(ConsumeType.liquid);
      if(e.liquids.get(l.liquid)<l.amount-0.01){
        e.increaseHeat(speed*Mathf.clamp(e.warmup*multiplier));
      } else {
        e.increaseHeat(-speed);
      }
      if(e.getHeat()>0.99){
        Call.onTileDestroyed(tile);
      }
    } catch (e){
      print(e);
      print(e.stack);
    }
  },
  onDestroyed(tile){
    Damage.damage(null,tile.drawx(),tile.drawy(),this.explosionRadius*8,this.explosionDamage*4,true)
    tile.entity.warmup = 1;
    this.super$onDestroyed(tile);
  }
});
nuc.entityType = prov(()=>extend (ImpactReactor.FusionReactorEntity,{
  _heat:0,
  getHeat(){
    return this._heat;
  },
  increaseHeat(value){
    this._heat += value;
    this._heat = Mathf.clamp(this._heat);
  }
}));