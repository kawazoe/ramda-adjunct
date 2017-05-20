import { of, ap, map, equals, concat, chain } from 'fantasy-land';

import { aliases } from './util';
import { applyTrait, functorTrait, setoidTrait, semigroupTrait, chainTrait } from './traits';


/**
 * The simplest {@link https://github.com/fantasyland/fantasy-land|fantasy-land}
 * compatible monad which attaches no information to values.
 *
 * The Identity type is a very simple type that has no interesting side effects and
 * is effectively just a container of some value. So why does it exist ?
 * The Identity type is often used as the base monad of a monad
 * transformer when no other behaviour is required.
 *
 * @memberOf RA
 * @implements
 * {@link https://github.com/fantasyland/fantasy-land#apply|Apply},
 * {@link https://github.com/fantasyland/fantasy-land#applicative|Applicative},
 * {@link https://github.com/fantasyland/fantasy-land#functor|Functor},
 * {@link https://github.com/fantasyland/fantasy-land#setoid|Setoid},
 * {@link https://github.com/fantasyland/fantasy-land#semigroup|Semigroup},
 * {@link https://github.com/fantasyland/fantasy-land#chain|Chain},
 * {@link https://github.com/fantasyland/fantasy-land#monad|Monad}
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 */
class Identity {
  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#applicative|Applicative} specification.
   *
   * @static
   * @sig of :: Applicative f => a -> f a
   * @param {*} value
   * @returns {RA.Identity}
   * @example
   *
   * const a = Identity.of(1); //=> Identity(1)
   */
  static [of](value) {
    return new Identity(value);
  }

  /**
   * @static
   */
  static get ['@@type']() {
    return 'RA/Identity';
  }

  /**
   * Private constructor. Use {@link RA.Identity.of|Identity.of} instead.
   *
   * @private
   * @param {*} value
   * @return {RA.Identity}
   */
  constructor(value) {
    this.value = value;
  }

  /**
   * Catamorphism for a value.
   * @returns {*}
   * @example
   *
   * const a = Identity.of(1);
   * a.get(); //=> 1
   */
  get() {
    return this.value;
  }

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#apply|Apply} specification.
   *
   * @sig ap :: Apply f => f a ~> f (a -> b) -> f b
   * @param {RA.Identity} applyWithFn
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of(1);
   * const b = Identity.of(1).map(a => b => a + b);
   *
   * a.ap(b); //=> Identity(2)
   */
  [ap](applyWithFn) {
    return applyTrait[ap].call(this, applyWithFn);
  }

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#functor|Functor} specification.
   *
   * @sig map :: Functor f => f a ~> (a -> b) -> f b
   * @param {Function} fn
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of(1);
   * a.map(a => a + 1); //=> Identity(2)
   */
  [map](fn) {
    return functorTrait[map].call(this, fn);
  }

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#setoid|Setoid} specification.
   *
   * @sig equals :: Setoid a => a ~> a -> Boolean
   * @param {RA.Identity} setoid
   * @return {boolean}
   * @example
   *
   * const a = Identity.of(1);
   * const b = Identity.of(1);
   * const c = Identity.of(2);
   *
   * a.equlas(b); //=> true
   * a.equals(c); //=> false
   */
  [equals](setoid) {
    return setoidTrait[equals].call(this, setoid);
  }

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#semigroup|Semigroup} specification.
   *
   * @sig concat :: Semigroup a => a ~> a -> a
   * @param {RA.Identity} semigroup
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of(1);
   * const b = Identity.of(1);
   * a.concat(b); //=> 2
   *
   * const c = Identity.of('c');
   * const d = Identity.of('d');
   * c.concat(d); //=> 'cd'
   *
   * const e = Identity.of(['e']);
   * const f = Identity.of(['f']);
   * e.concat(f); //=> ['e', 'f']
   */
  [concat](semigroup) {
    return semigroupTrait[concat].call(this, semigroup);
  }

  /**
   * Fantasy land {@link https://github.com/fantasyland/fantasy-land#chain|Chain} specification.
   *
   * @sig chain :: Chain m => m a ~> (a -> m b) -> m b
   * @param {Function} fn Function returning the value of the same {@link https://github.com/fantasyland/fantasy-land#semigroup|Chain}
   * @return {RA.Identity}
   * @example
   *
   * const a = Identity.of(1);
   * const fn = val => Identity.of(val + 1);
   *
   * a.chain(fn).chain(fn); //=> Identity(3)
   */
  [chain](fn) {
    return chainTrait[chain].call(this, fn);
  }
}

aliases(Identity).forEach(([alias, fn]) => {
  Identity[alias] = fn;
});
aliases(Identity.prototype).forEach(([alias, fn]) => {
  Identity.prototype[alias] = fn;
});

export default Identity;
