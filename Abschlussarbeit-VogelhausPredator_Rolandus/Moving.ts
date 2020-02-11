namespace Abschlussarbeit {
    export abstract class Moving extends Thingo {

        protected velocity: Vector;

        public abstract move(_timeslice: number): void;

    }
}