export default interface Candle {
    price(): number;
    description(): string;
}

export class SimpleCandle implements Candle {
    price(): number {
        return 0;
    }
    description(): string {
        return "Simple Candle";
    }
}

export abstract class CandleDecorator implements Candle{
    constructor(protected candle: Candle) {}

    abstract price(): number;
    abstract description(): string;
}

export class JarDecorator extends CandleDecorator{
    price(): number {
        return this.candle.price() + 2.0;
    }
    description(): string {
        return this.candle.description() + "+ Jar";
    }
}

export class WickDecorator extends CandleDecorator{
    price(): number {
        return this.candle.price() + 1.0;
    }
    description(): string {
        return this.candle.description() + "+ WoodWick";
    }
    
}

export class SizeDecorator extends CandleDecorator{
    price(): number {
        return this.candle.price() + 5.0;
    }
    description(): string {
        return this.candle.description() + "+ 12 oz";
    }
    
}

//can do something like
// let candle = new SimpleCandle();
// if(woodwick) { candle = new WickDecorator(candle)}
// if (JarSize == 12) {candle = new SizeDecorator(candle)}
// if( Jar == Green || Amber) candle = new JarDecorator(candle)
// candle.price() = total price 

