const hugevault = extendContent(StorageBlock, "hugevault", {
    icons(){
    return [
        Core.atlas.find(this.name),
        Core.atlas.find("Better-Blocks-Mod-hugevault-team")
    ];},

    draw() {
        Draw.rect(Core.atlas.find("Better-Blocks-Mod-hugevault"), this.x, this.y);
        Draw.color(this.team.color);
        Draw.rect(Core.atlas.find("Better-Blocks-Mod-hugevault-team"), this.x, this.y);
        Draw.color();
    }
});