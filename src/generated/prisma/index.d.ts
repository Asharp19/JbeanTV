
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AgentPredictionsHistoryPastSevenPredictions
 * 
 */
export type AgentPredictionsHistoryPastSevenPredictions = $Result.DefaultSelection<Prisma.$AgentPredictionsHistoryPastSevenPredictionsPayload>
/**
 * Model AgentPredictionsHistoryPastSevenPredictionsCeoAgent
 * 
 */
export type AgentPredictionsHistoryPastSevenPredictionsCeoAgent = $Result.DefaultSelection<Prisma.$AgentPredictionsHistoryPastSevenPredictionsCeoAgentPayload>
/**
 * Model AgentPredictionsHistoryPastSevenPredictionsResultPrice
 * 
 */
export type AgentPredictionsHistoryPastSevenPredictionsResultPrice = $Result.DefaultSelection<Prisma.$AgentPredictionsHistoryPastSevenPredictionsResultPricePayload>
/**
 * Model AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent
 * 
 */
export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent = $Result.DefaultSelection<Prisma.$AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentPayload>
/**
 * Model AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds
 * 
 */
export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds = $Result.DefaultSelection<Prisma.$AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsPayload>
/**
 * Model PredictionsMessagesCurrentAnalysis
 * 
 */
export type PredictionsMessagesCurrentAnalysis = $Result.DefaultSelection<Prisma.$PredictionsMessagesCurrentAnalysisPayload>
/**
 * Model agent_predictions_history
 * 
 */
export type agent_predictions_history = $Result.DefaultSelection<Prisma.$agent_predictions_historyPayload>
/**
 * Model prediction_leaderboard
 * 
 */
export type prediction_leaderboard = $Result.DefaultSelection<Prisma.$prediction_leaderboardPayload>
/**
 * Model predictions
 * 
 */
export type predictions = $Result.DefaultSelection<Prisma.$predictionsPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Agent_predictions_histories
 * const agent_predictions_histories = await prisma.agent_predictions_history.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Agent_predictions_histories
   * const agent_predictions_histories = await prisma.agent_predictions_history.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.agent_predictions_history`: Exposes CRUD operations for the **agent_predictions_history** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agent_predictions_histories
    * const agent_predictions_histories = await prisma.agent_predictions_history.findMany()
    * ```
    */
  get agent_predictions_history(): Prisma.agent_predictions_historyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prediction_leaderboard`: Exposes CRUD operations for the **prediction_leaderboard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prediction_leaderboards
    * const prediction_leaderboards = await prisma.prediction_leaderboard.findMany()
    * ```
    */
  get prediction_leaderboard(): Prisma.prediction_leaderboardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.predictions`: Exposes CRUD operations for the **predictions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Predictions
    * const predictions = await prisma.predictions.findMany()
    * ```
    */
  get predictions(): Prisma.predictionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    agent_predictions_history: 'agent_predictions_history',
    prediction_leaderboard: 'prediction_leaderboard',
    predictions: 'predictions',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "agent_predictions_history" | "prediction_leaderboard" | "predictions" | "users"
      txIsolationLevel: never
    }
    model: {
      agent_predictions_history: {
        payload: Prisma.$agent_predictions_historyPayload<ExtArgs>
        fields: Prisma.agent_predictions_historyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agent_predictions_historyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agent_predictions_historyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload>
          }
          findFirst: {
            args: Prisma.agent_predictions_historyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agent_predictions_historyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload>
          }
          findMany: {
            args: Prisma.agent_predictions_historyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload>[]
          }
          create: {
            args: Prisma.agent_predictions_historyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload>
          }
          createMany: {
            args: Prisma.agent_predictions_historyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.agent_predictions_historyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload>
          }
          update: {
            args: Prisma.agent_predictions_historyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload>
          }
          deleteMany: {
            args: Prisma.agent_predictions_historyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agent_predictions_historyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.agent_predictions_historyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_predictions_historyPayload>
          }
          aggregate: {
            args: Prisma.Agent_predictions_historyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent_predictions_history>
          }
          groupBy: {
            args: Prisma.agent_predictions_historyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Agent_predictions_historyGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.agent_predictions_historyFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.agent_predictions_historyAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.agent_predictions_historyCountArgs<ExtArgs>
            result: $Utils.Optional<Agent_predictions_historyCountAggregateOutputType> | number
          }
        }
      }
      prediction_leaderboard: {
        payload: Prisma.$prediction_leaderboardPayload<ExtArgs>
        fields: Prisma.prediction_leaderboardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.prediction_leaderboardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.prediction_leaderboardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload>
          }
          findFirst: {
            args: Prisma.prediction_leaderboardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.prediction_leaderboardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload>
          }
          findMany: {
            args: Prisma.prediction_leaderboardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload>[]
          }
          create: {
            args: Prisma.prediction_leaderboardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload>
          }
          createMany: {
            args: Prisma.prediction_leaderboardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.prediction_leaderboardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload>
          }
          update: {
            args: Prisma.prediction_leaderboardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload>
          }
          deleteMany: {
            args: Prisma.prediction_leaderboardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.prediction_leaderboardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.prediction_leaderboardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prediction_leaderboardPayload>
          }
          aggregate: {
            args: Prisma.Prediction_leaderboardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrediction_leaderboard>
          }
          groupBy: {
            args: Prisma.prediction_leaderboardGroupByArgs<ExtArgs>
            result: $Utils.Optional<Prediction_leaderboardGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.prediction_leaderboardFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.prediction_leaderboardAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.prediction_leaderboardCountArgs<ExtArgs>
            result: $Utils.Optional<Prediction_leaderboardCountAggregateOutputType> | number
          }
        }
      }
      predictions: {
        payload: Prisma.$predictionsPayload<ExtArgs>
        fields: Prisma.predictionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.predictionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.predictionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          findFirst: {
            args: Prisma.predictionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.predictionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          findMany: {
            args: Prisma.predictionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>[]
          }
          create: {
            args: Prisma.predictionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          createMany: {
            args: Prisma.predictionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.predictionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          update: {
            args: Prisma.predictionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          deleteMany: {
            args: Prisma.predictionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.predictionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.predictionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          aggregate: {
            args: Prisma.PredictionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePredictions>
          }
          groupBy: {
            args: Prisma.predictionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PredictionsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.predictionsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.predictionsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.predictionsCountArgs<ExtArgs>
            result: $Utils.Optional<PredictionsCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.usersFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.usersAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    agent_predictions_history?: agent_predictions_historyOmit
    prediction_leaderboard?: prediction_leaderboardOmit
    predictions?: predictionsOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model AgentPredictionsHistoryPastSevenPredictions
   */





  export type AgentPredictionsHistoryPastSevenPredictionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ceoAgent?: boolean | AgentPredictionsHistoryPastSevenPredictionsCeoAgentDefaultArgs<ExtArgs>
    lastUpdated?: boolean
    resultPrice?: boolean | AgentPredictionsHistoryPastSevenPredictionsResultPriceDefaultArgs<ExtArgs>
    targetDate?: boolean
    technicalAgent?: boolean | AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentDefaultArgs<ExtArgs>
    timestamp?: boolean
    wisdomOfCrowds?: boolean | AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictions"]>



  export type AgentPredictionsHistoryPastSevenPredictionsSelectScalar = {
    lastUpdated?: boolean
    targetDate?: boolean
    timestamp?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ceoAgent" | "lastUpdated" | "resultPrice" | "targetDate" | "technicalAgent" | "timestamp" | "wisdomOfCrowds", ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictions"]>
  export type AgentPredictionsHistoryPastSevenPredictionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentPredictionsHistoryPastSevenPredictionsPayload = {
    name: "AgentPredictionsHistoryPastSevenPredictions"
    objects: {}
    scalars: {
      lastUpdated: string
      targetDate: string
      timestamp: string
    }
    composites: {
      ceoAgent: Prisma.$AgentPredictionsHistoryPastSevenPredictionsCeoAgentPayload
      resultPrice: Prisma.$AgentPredictionsHistoryPastSevenPredictionsResultPricePayload
      technicalAgent: Prisma.$AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentPayload
      wisdomOfCrowds: Prisma.$AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsPayload
    }
  }

  type AgentPredictionsHistoryPastSevenPredictionsGetPayload<S extends boolean | null | undefined | AgentPredictionsHistoryPastSevenPredictionsDefaultArgs> = $Result.GetResult<Prisma.$AgentPredictionsHistoryPastSevenPredictionsPayload, S>





  /**
   * Fields of the AgentPredictionsHistoryPastSevenPredictions model
   */
  interface AgentPredictionsHistoryPastSevenPredictionsFieldRefs {
    readonly lastUpdated: FieldRef<"AgentPredictionsHistoryPastSevenPredictions", 'String'>
    readonly targetDate: FieldRef<"AgentPredictionsHistoryPastSevenPredictions", 'String'>
    readonly timestamp: FieldRef<"AgentPredictionsHistoryPastSevenPredictions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgentPredictionsHistoryPastSevenPredictions without action
   */
  export type AgentPredictionsHistoryPastSevenPredictionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPredictionsHistoryPastSevenPredictions
     */
    select?: AgentPredictionsHistoryPastSevenPredictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPredictionsHistoryPastSevenPredictions
     */
    omit?: AgentPredictionsHistoryPastSevenPredictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPredictionsHistoryPastSevenPredictionsInclude<ExtArgs> | null
  }


  /**
   * Model AgentPredictionsHistoryPastSevenPredictionsCeoAgent
   */





  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    close?: boolean
    high?: boolean
    low?: boolean
  }, ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictionsCeoAgent"]>



  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentSelectScalar = {
    close?: boolean
    high?: boolean
    low?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"close" | "high" | "low", ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictionsCeoAgent"]>

  export type $AgentPredictionsHistoryPastSevenPredictionsCeoAgentPayload = {
    name: "AgentPredictionsHistoryPastSevenPredictionsCeoAgent"
    objects: {}
    scalars: {
      close: number
      high: number
      low: number
    }
    composites: {}
  }

  type AgentPredictionsHistoryPastSevenPredictionsCeoAgentGetPayload<S extends boolean | null | undefined | AgentPredictionsHistoryPastSevenPredictionsCeoAgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPredictionsHistoryPastSevenPredictionsCeoAgentPayload, S>





  /**
   * Fields of the AgentPredictionsHistoryPastSevenPredictionsCeoAgent model
   */
  interface AgentPredictionsHistoryPastSevenPredictionsCeoAgentFieldRefs {
    readonly close: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsCeoAgent", 'Float'>
    readonly high: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsCeoAgent", 'Float'>
    readonly low: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsCeoAgent", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * AgentPredictionsHistoryPastSevenPredictionsCeoAgent without action
   */
  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPredictionsHistoryPastSevenPredictionsCeoAgent
     */
    select?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPredictionsHistoryPastSevenPredictionsCeoAgent
     */
    omit?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentOmit<ExtArgs> | null
  }


  /**
   * Model AgentPredictionsHistoryPastSevenPredictionsResultPrice
   */





  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    close?: boolean
    fetchedAt?: boolean
    high?: boolean
    low?: boolean
    open?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictionsResultPrice"]>



  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceSelectScalar = {
    close?: boolean
    fetchedAt?: boolean
    high?: boolean
    low?: boolean
    open?: boolean
    timestamp?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"close" | "fetchedAt" | "high" | "low" | "open" | "timestamp", ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictionsResultPrice"]>

  export type $AgentPredictionsHistoryPastSevenPredictionsResultPricePayload = {
    name: "AgentPredictionsHistoryPastSevenPredictionsResultPrice"
    objects: {}
    scalars: {
      close: number | null
      fetchedAt: string | null
      high: number | null
      low: number | null
      open: number | null
      timestamp: string | null
    }
    composites: {}
  }

  type AgentPredictionsHistoryPastSevenPredictionsResultPriceGetPayload<S extends boolean | null | undefined | AgentPredictionsHistoryPastSevenPredictionsResultPriceDefaultArgs> = $Result.GetResult<Prisma.$AgentPredictionsHistoryPastSevenPredictionsResultPricePayload, S>





  /**
   * Fields of the AgentPredictionsHistoryPastSevenPredictionsResultPrice model
   */
  interface AgentPredictionsHistoryPastSevenPredictionsResultPriceFieldRefs {
    readonly close: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsResultPrice", 'Float'>
    readonly fetchedAt: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsResultPrice", 'String'>
    readonly high: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsResultPrice", 'Float'>
    readonly low: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsResultPrice", 'Float'>
    readonly open: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsResultPrice", 'Float'>
    readonly timestamp: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsResultPrice", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgentPredictionsHistoryPastSevenPredictionsResultPrice without action
   */
  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPredictionsHistoryPastSevenPredictionsResultPrice
     */
    select?: AgentPredictionsHistoryPastSevenPredictionsResultPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPredictionsHistoryPastSevenPredictionsResultPrice
     */
    omit?: AgentPredictionsHistoryPastSevenPredictionsResultPriceOmit<ExtArgs> | null
  }


  /**
   * Model AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent
   */





  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    close?: boolean
    high?: boolean
    low?: boolean
  }, ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictionsTechnicalAgent"]>



  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentSelectScalar = {
    close?: boolean
    high?: boolean
    low?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"close" | "high" | "low", ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictionsTechnicalAgent"]>

  export type $AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentPayload = {
    name: "AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent"
    objects: {}
    scalars: {
      close: number
      high: number
      low: number
    }
    composites: {}
  }

  type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentGetPayload<S extends boolean | null | undefined | AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentPayload, S>





  /**
   * Fields of the AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent model
   */
  interface AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentFieldRefs {
    readonly close: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent", 'Float'>
    readonly high: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent", 'Float'>
    readonly low: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent without action
   */
  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent
     */
    select?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent
     */
    omit?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentOmit<ExtArgs> | null
  }


  /**
   * Model AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds
   */





  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    close?: boolean
    high?: boolean
    low?: boolean
  }, ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds"]>



  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsSelectScalar = {
    close?: boolean
    high?: boolean
    low?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"close" | "high" | "low", ExtArgs["result"]["agentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds"]>

  export type $AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsPayload = {
    name: "AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds"
    objects: {}
    scalars: {
      close: number
      high: number
      low: number
    }
    composites: {}
  }

  type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsGetPayload<S extends boolean | null | undefined | AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsDefaultArgs> = $Result.GetResult<Prisma.$AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsPayload, S>





  /**
   * Fields of the AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds model
   */
  interface AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsFieldRefs {
    readonly close: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds", 'Float'>
    readonly high: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds", 'Float'>
    readonly low: FieldRef<"AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds without action
   */
  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds
     */
    select?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds
     */
    omit?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsOmit<ExtArgs> | null
  }


  /**
   * Model PredictionsMessagesCurrentAnalysis
   */





  export type PredictionsMessagesCurrentAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CeoAgent?: boolean
    CrowdAnalystAgent?: boolean
    TechnicalAgent?: boolean
  }, ExtArgs["result"]["predictionsMessagesCurrentAnalysis"]>



  export type PredictionsMessagesCurrentAnalysisSelectScalar = {
    CeoAgent?: boolean
    CrowdAnalystAgent?: boolean
    TechnicalAgent?: boolean
  }

  export type PredictionsMessagesCurrentAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"CeoAgent" | "CrowdAnalystAgent" | "TechnicalAgent", ExtArgs["result"]["predictionsMessagesCurrentAnalysis"]>

  export type $PredictionsMessagesCurrentAnalysisPayload = {
    name: "PredictionsMessagesCurrentAnalysis"
    objects: {}
    scalars: {
      CeoAgent: string[]
      CrowdAnalystAgent: string[]
      TechnicalAgent: string[]
    }
    composites: {}
  }

  type PredictionsMessagesCurrentAnalysisGetPayload<S extends boolean | null | undefined | PredictionsMessagesCurrentAnalysisDefaultArgs> = $Result.GetResult<Prisma.$PredictionsMessagesCurrentAnalysisPayload, S>





  /**
   * Fields of the PredictionsMessagesCurrentAnalysis model
   */
  interface PredictionsMessagesCurrentAnalysisFieldRefs {
    readonly CeoAgent: FieldRef<"PredictionsMessagesCurrentAnalysis", 'String[]'>
    readonly CrowdAnalystAgent: FieldRef<"PredictionsMessagesCurrentAnalysis", 'String[]'>
    readonly TechnicalAgent: FieldRef<"PredictionsMessagesCurrentAnalysis", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * PredictionsMessagesCurrentAnalysis without action
   */
  export type PredictionsMessagesCurrentAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionsMessagesCurrentAnalysis
     */
    select?: PredictionsMessagesCurrentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionsMessagesCurrentAnalysis
     */
    omit?: PredictionsMessagesCurrentAnalysisOmit<ExtArgs> | null
  }


  /**
   * Model agent_predictions_history
   */

  export type AggregateAgent_predictions_history = {
    _count: Agent_predictions_historyCountAggregateOutputType | null
    _min: Agent_predictions_historyMinAggregateOutputType | null
    _max: Agent_predictions_historyMaxAggregateOutputType | null
  }

  export type Agent_predictions_historyMinAggregateOutputType = {
    id: string | null
  }

  export type Agent_predictions_historyMaxAggregateOutputType = {
    id: string | null
  }

  export type Agent_predictions_historyCountAggregateOutputType = {
    id: number
    agent: number
    pair: number
    timestamp: number
    _all: number
  }


  export type Agent_predictions_historyMinAggregateInputType = {
    id?: true
  }

  export type Agent_predictions_historyMaxAggregateInputType = {
    id?: true
  }

  export type Agent_predictions_historyCountAggregateInputType = {
    id?: true
    agent?: true
    pair?: true
    timestamp?: true
    _all?: true
  }

  export type Agent_predictions_historyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_predictions_history to aggregate.
     */
    where?: agent_predictions_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_predictions_histories to fetch.
     */
    orderBy?: agent_predictions_historyOrderByWithRelationInput | agent_predictions_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agent_predictions_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_predictions_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_predictions_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agent_predictions_histories
    **/
    _count?: true | Agent_predictions_historyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Agent_predictions_historyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Agent_predictions_historyMaxAggregateInputType
  }

  export type GetAgent_predictions_historyAggregateType<T extends Agent_predictions_historyAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent_predictions_history]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent_predictions_history[P]>
      : GetScalarType<T[P], AggregateAgent_predictions_history[P]>
  }




  export type agent_predictions_historyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_predictions_historyWhereInput
    orderBy?: agent_predictions_historyOrderByWithAggregationInput | agent_predictions_historyOrderByWithAggregationInput[]
    by: Agent_predictions_historyScalarFieldEnum[] | Agent_predictions_historyScalarFieldEnum
    having?: agent_predictions_historyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Agent_predictions_historyCountAggregateInputType | true
    _min?: Agent_predictions_historyMinAggregateInputType
    _max?: Agent_predictions_historyMaxAggregateInputType
  }

  export type Agent_predictions_historyGroupByOutputType = {
    id: string
    agent: JsonValue | null
    pair: JsonValue | null
    timestamp: JsonValue | null
    _count: Agent_predictions_historyCountAggregateOutputType | null
    _min: Agent_predictions_historyMinAggregateOutputType | null
    _max: Agent_predictions_historyMaxAggregateOutputType | null
  }

  type GetAgent_predictions_historyGroupByPayload<T extends agent_predictions_historyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Agent_predictions_historyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Agent_predictions_historyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Agent_predictions_historyGroupByOutputType[P]>
            : GetScalarType<T[P], Agent_predictions_historyGroupByOutputType[P]>
        }
      >
    >


  export type agent_predictions_historySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent?: boolean
    pair?: boolean
    past_seven_predictions?: boolean | AgentPredictionsHistoryPastSevenPredictionsDefaultArgs<ExtArgs>
    timestamp?: boolean
  }, ExtArgs["result"]["agent_predictions_history"]>



  export type agent_predictions_historySelectScalar = {
    id?: boolean
    agent?: boolean
    pair?: boolean
    timestamp?: boolean
  }

  export type agent_predictions_historyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agent" | "pair" | "past_seven_predictions" | "timestamp", ExtArgs["result"]["agent_predictions_history"]>
  export type agent_predictions_historyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $agent_predictions_historyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agent_predictions_history"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * Field referred in an index, but found no data to define the type.
       */
      agent: Prisma.JsonValue | null
      /**
       * Field referred in an index, but found no data to define the type.
       */
      pair: Prisma.JsonValue | null
      /**
       * Field referred in an index, but found no data to define the type.
       */
      timestamp: Prisma.JsonValue | null
    }, ExtArgs["result"]["agent_predictions_history"]>
    composites: {
      past_seven_predictions: Prisma.$AgentPredictionsHistoryPastSevenPredictionsPayload[]
    }
  }

  type agent_predictions_historyGetPayload<S extends boolean | null | undefined | agent_predictions_historyDefaultArgs> = $Result.GetResult<Prisma.$agent_predictions_historyPayload, S>

  type agent_predictions_historyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agent_predictions_historyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Agent_predictions_historyCountAggregateInputType | true
    }

  export interface agent_predictions_historyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agent_predictions_history'], meta: { name: 'agent_predictions_history' } }
    /**
     * Find zero or one Agent_predictions_history that matches the filter.
     * @param {agent_predictions_historyFindUniqueArgs} args - Arguments to find a Agent_predictions_history
     * @example
     * // Get one Agent_predictions_history
     * const agent_predictions_history = await prisma.agent_predictions_history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agent_predictions_historyFindUniqueArgs>(args: SelectSubset<T, agent_predictions_historyFindUniqueArgs<ExtArgs>>): Prisma__agent_predictions_historyClient<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent_predictions_history that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agent_predictions_historyFindUniqueOrThrowArgs} args - Arguments to find a Agent_predictions_history
     * @example
     * // Get one Agent_predictions_history
     * const agent_predictions_history = await prisma.agent_predictions_history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agent_predictions_historyFindUniqueOrThrowArgs>(args: SelectSubset<T, agent_predictions_historyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agent_predictions_historyClient<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_predictions_history that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_predictions_historyFindFirstArgs} args - Arguments to find a Agent_predictions_history
     * @example
     * // Get one Agent_predictions_history
     * const agent_predictions_history = await prisma.agent_predictions_history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agent_predictions_historyFindFirstArgs>(args?: SelectSubset<T, agent_predictions_historyFindFirstArgs<ExtArgs>>): Prisma__agent_predictions_historyClient<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_predictions_history that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_predictions_historyFindFirstOrThrowArgs} args - Arguments to find a Agent_predictions_history
     * @example
     * // Get one Agent_predictions_history
     * const agent_predictions_history = await prisma.agent_predictions_history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agent_predictions_historyFindFirstOrThrowArgs>(args?: SelectSubset<T, agent_predictions_historyFindFirstOrThrowArgs<ExtArgs>>): Prisma__agent_predictions_historyClient<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agent_predictions_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_predictions_historyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agent_predictions_histories
     * const agent_predictions_histories = await prisma.agent_predictions_history.findMany()
     * 
     * // Get first 10 Agent_predictions_histories
     * const agent_predictions_histories = await prisma.agent_predictions_history.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agent_predictions_historyWithIdOnly = await prisma.agent_predictions_history.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends agent_predictions_historyFindManyArgs>(args?: SelectSubset<T, agent_predictions_historyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent_predictions_history.
     * @param {agent_predictions_historyCreateArgs} args - Arguments to create a Agent_predictions_history.
     * @example
     * // Create one Agent_predictions_history
     * const Agent_predictions_history = await prisma.agent_predictions_history.create({
     *   data: {
     *     // ... data to create a Agent_predictions_history
     *   }
     * })
     * 
     */
    create<T extends agent_predictions_historyCreateArgs>(args: SelectSubset<T, agent_predictions_historyCreateArgs<ExtArgs>>): Prisma__agent_predictions_historyClient<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agent_predictions_histories.
     * @param {agent_predictions_historyCreateManyArgs} args - Arguments to create many Agent_predictions_histories.
     * @example
     * // Create many Agent_predictions_histories
     * const agent_predictions_history = await prisma.agent_predictions_history.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agent_predictions_historyCreateManyArgs>(args?: SelectSubset<T, agent_predictions_historyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Agent_predictions_history.
     * @param {agent_predictions_historyDeleteArgs} args - Arguments to delete one Agent_predictions_history.
     * @example
     * // Delete one Agent_predictions_history
     * const Agent_predictions_history = await prisma.agent_predictions_history.delete({
     *   where: {
     *     // ... filter to delete one Agent_predictions_history
     *   }
     * })
     * 
     */
    delete<T extends agent_predictions_historyDeleteArgs>(args: SelectSubset<T, agent_predictions_historyDeleteArgs<ExtArgs>>): Prisma__agent_predictions_historyClient<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent_predictions_history.
     * @param {agent_predictions_historyUpdateArgs} args - Arguments to update one Agent_predictions_history.
     * @example
     * // Update one Agent_predictions_history
     * const agent_predictions_history = await prisma.agent_predictions_history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agent_predictions_historyUpdateArgs>(args: SelectSubset<T, agent_predictions_historyUpdateArgs<ExtArgs>>): Prisma__agent_predictions_historyClient<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agent_predictions_histories.
     * @param {agent_predictions_historyDeleteManyArgs} args - Arguments to filter Agent_predictions_histories to delete.
     * @example
     * // Delete a few Agent_predictions_histories
     * const { count } = await prisma.agent_predictions_history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agent_predictions_historyDeleteManyArgs>(args?: SelectSubset<T, agent_predictions_historyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_predictions_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_predictions_historyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agent_predictions_histories
     * const agent_predictions_history = await prisma.agent_predictions_history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agent_predictions_historyUpdateManyArgs>(args: SelectSubset<T, agent_predictions_historyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Agent_predictions_history.
     * @param {agent_predictions_historyUpsertArgs} args - Arguments to update or create a Agent_predictions_history.
     * @example
     * // Update or create a Agent_predictions_history
     * const agent_predictions_history = await prisma.agent_predictions_history.upsert({
     *   create: {
     *     // ... data to create a Agent_predictions_history
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent_predictions_history we want to update
     *   }
     * })
     */
    upsert<T extends agent_predictions_historyUpsertArgs>(args: SelectSubset<T, agent_predictions_historyUpsertArgs<ExtArgs>>): Prisma__agent_predictions_historyClient<$Result.GetResult<Prisma.$agent_predictions_historyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agent_predictions_histories that matches the filter.
     * @param {agent_predictions_historyFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const agent_predictions_history = await prisma.agent_predictions_history.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: agent_predictions_historyFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Agent_predictions_history.
     * @param {agent_predictions_historyAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const agent_predictions_history = await prisma.agent_predictions_history.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: agent_predictions_historyAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Agent_predictions_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_predictions_historyCountArgs} args - Arguments to filter Agent_predictions_histories to count.
     * @example
     * // Count the number of Agent_predictions_histories
     * const count = await prisma.agent_predictions_history.count({
     *   where: {
     *     // ... the filter for the Agent_predictions_histories we want to count
     *   }
     * })
    **/
    count<T extends agent_predictions_historyCountArgs>(
      args?: Subset<T, agent_predictions_historyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Agent_predictions_historyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent_predictions_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Agent_predictions_historyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Agent_predictions_historyAggregateArgs>(args: Subset<T, Agent_predictions_historyAggregateArgs>): Prisma.PrismaPromise<GetAgent_predictions_historyAggregateType<T>>

    /**
     * Group by Agent_predictions_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_predictions_historyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agent_predictions_historyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agent_predictions_historyGroupByArgs['orderBy'] }
        : { orderBy?: agent_predictions_historyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agent_predictions_historyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgent_predictions_historyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agent_predictions_history model
   */
  readonly fields: agent_predictions_historyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agent_predictions_history.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agent_predictions_historyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agent_predictions_history model
   */
  interface agent_predictions_historyFieldRefs {
    readonly id: FieldRef<"agent_predictions_history", 'String'>
    readonly agent: FieldRef<"agent_predictions_history", 'Json'>
    readonly pair: FieldRef<"agent_predictions_history", 'Json'>
    readonly timestamp: FieldRef<"agent_predictions_history", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * agent_predictions_history findUnique
   */
  export type agent_predictions_historyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * Filter, which agent_predictions_history to fetch.
     */
    where: agent_predictions_historyWhereUniqueInput
  }

  /**
   * agent_predictions_history findUniqueOrThrow
   */
  export type agent_predictions_historyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * Filter, which agent_predictions_history to fetch.
     */
    where: agent_predictions_historyWhereUniqueInput
  }

  /**
   * agent_predictions_history findFirst
   */
  export type agent_predictions_historyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * Filter, which agent_predictions_history to fetch.
     */
    where?: agent_predictions_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_predictions_histories to fetch.
     */
    orderBy?: agent_predictions_historyOrderByWithRelationInput | agent_predictions_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_predictions_histories.
     */
    cursor?: agent_predictions_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_predictions_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_predictions_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_predictions_histories.
     */
    distinct?: Agent_predictions_historyScalarFieldEnum | Agent_predictions_historyScalarFieldEnum[]
  }

  /**
   * agent_predictions_history findFirstOrThrow
   */
  export type agent_predictions_historyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * Filter, which agent_predictions_history to fetch.
     */
    where?: agent_predictions_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_predictions_histories to fetch.
     */
    orderBy?: agent_predictions_historyOrderByWithRelationInput | agent_predictions_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_predictions_histories.
     */
    cursor?: agent_predictions_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_predictions_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_predictions_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_predictions_histories.
     */
    distinct?: Agent_predictions_historyScalarFieldEnum | Agent_predictions_historyScalarFieldEnum[]
  }

  /**
   * agent_predictions_history findMany
   */
  export type agent_predictions_historyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * Filter, which agent_predictions_histories to fetch.
     */
    where?: agent_predictions_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_predictions_histories to fetch.
     */
    orderBy?: agent_predictions_historyOrderByWithRelationInput | agent_predictions_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agent_predictions_histories.
     */
    cursor?: agent_predictions_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_predictions_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_predictions_histories.
     */
    skip?: number
    distinct?: Agent_predictions_historyScalarFieldEnum | Agent_predictions_historyScalarFieldEnum[]
  }

  /**
   * agent_predictions_history create
   */
  export type agent_predictions_historyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * The data needed to create a agent_predictions_history.
     */
    data: XOR<agent_predictions_historyCreateInput, agent_predictions_historyUncheckedCreateInput>
  }

  /**
   * agent_predictions_history createMany
   */
  export type agent_predictions_historyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agent_predictions_histories.
     */
    data: agent_predictions_historyCreateManyInput | agent_predictions_historyCreateManyInput[]
  }

  /**
   * agent_predictions_history update
   */
  export type agent_predictions_historyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * The data needed to update a agent_predictions_history.
     */
    data: XOR<agent_predictions_historyUpdateInput, agent_predictions_historyUncheckedUpdateInput>
    /**
     * Choose, which agent_predictions_history to update.
     */
    where: agent_predictions_historyWhereUniqueInput
  }

  /**
   * agent_predictions_history updateMany
   */
  export type agent_predictions_historyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agent_predictions_histories.
     */
    data: XOR<agent_predictions_historyUpdateManyMutationInput, agent_predictions_historyUncheckedUpdateManyInput>
    /**
     * Filter which agent_predictions_histories to update
     */
    where?: agent_predictions_historyWhereInput
    /**
     * Limit how many agent_predictions_histories to update.
     */
    limit?: number
  }

  /**
   * agent_predictions_history upsert
   */
  export type agent_predictions_historyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * The filter to search for the agent_predictions_history to update in case it exists.
     */
    where: agent_predictions_historyWhereUniqueInput
    /**
     * In case the agent_predictions_history found by the `where` argument doesn't exist, create a new agent_predictions_history with this data.
     */
    create: XOR<agent_predictions_historyCreateInput, agent_predictions_historyUncheckedCreateInput>
    /**
     * In case the agent_predictions_history was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agent_predictions_historyUpdateInput, agent_predictions_historyUncheckedUpdateInput>
  }

  /**
   * agent_predictions_history delete
   */
  export type agent_predictions_historyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
    /**
     * Filter which agent_predictions_history to delete.
     */
    where: agent_predictions_historyWhereUniqueInput
  }

  /**
   * agent_predictions_history deleteMany
   */
  export type agent_predictions_historyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_predictions_histories to delete
     */
    where?: agent_predictions_historyWhereInput
    /**
     * Limit how many agent_predictions_histories to delete.
     */
    limit?: number
  }

  /**
   * agent_predictions_history findRaw
   */
  export type agent_predictions_historyFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * agent_predictions_history aggregateRaw
   */
  export type agent_predictions_historyAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * agent_predictions_history without action
   */
  export type agent_predictions_historyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_predictions_history
     */
    select?: agent_predictions_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_predictions_history
     */
    omit?: agent_predictions_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_predictions_historyInclude<ExtArgs> | null
  }


  /**
   * Model prediction_leaderboard
   */

  export type AggregatePrediction_leaderboard = {
    _count: Prediction_leaderboardCountAggregateOutputType | null
    _avg: Prediction_leaderboardAvgAggregateOutputType | null
    _sum: Prediction_leaderboardSumAggregateOutputType | null
    _min: Prediction_leaderboardMinAggregateOutputType | null
    _max: Prediction_leaderboardMaxAggregateOutputType | null
  }

  export type Prediction_leaderboardAvgAggregateOutputType = {
    v: number | null
    predictedPrice: number | null
  }

  export type Prediction_leaderboardSumAggregateOutputType = {
    v: number | null
    predictedPrice: number | null
  }

  export type Prediction_leaderboardMinAggregateOutputType = {
    id: string | null
    v: number | null
    pair: string | null
    predictedAt: string | null
    predictedPrice: number | null
    targetDate: string | null
    walletAddress: string | null
    walletType: string | null
  }

  export type Prediction_leaderboardMaxAggregateOutputType = {
    id: string | null
    v: number | null
    pair: string | null
    predictedAt: string | null
    predictedPrice: number | null
    targetDate: string | null
    walletAddress: string | null
    walletType: string | null
  }

  export type Prediction_leaderboardCountAggregateOutputType = {
    id: number
    v: number
    pair: number
    predictedAt: number
    predictedPrice: number
    targetDate: number
    walletAddress: number
    walletType: number
    _all: number
  }


  export type Prediction_leaderboardAvgAggregateInputType = {
    v?: true
    predictedPrice?: true
  }

  export type Prediction_leaderboardSumAggregateInputType = {
    v?: true
    predictedPrice?: true
  }

  export type Prediction_leaderboardMinAggregateInputType = {
    id?: true
    v?: true
    pair?: true
    predictedAt?: true
    predictedPrice?: true
    targetDate?: true
    walletAddress?: true
    walletType?: true
  }

  export type Prediction_leaderboardMaxAggregateInputType = {
    id?: true
    v?: true
    pair?: true
    predictedAt?: true
    predictedPrice?: true
    targetDate?: true
    walletAddress?: true
    walletType?: true
  }

  export type Prediction_leaderboardCountAggregateInputType = {
    id?: true
    v?: true
    pair?: true
    predictedAt?: true
    predictedPrice?: true
    targetDate?: true
    walletAddress?: true
    walletType?: true
    _all?: true
  }

  export type Prediction_leaderboardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which prediction_leaderboard to aggregate.
     */
    where?: prediction_leaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prediction_leaderboards to fetch.
     */
    orderBy?: prediction_leaderboardOrderByWithRelationInput | prediction_leaderboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: prediction_leaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prediction_leaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prediction_leaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned prediction_leaderboards
    **/
    _count?: true | Prediction_leaderboardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Prediction_leaderboardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Prediction_leaderboardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Prediction_leaderboardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Prediction_leaderboardMaxAggregateInputType
  }

  export type GetPrediction_leaderboardAggregateType<T extends Prediction_leaderboardAggregateArgs> = {
        [P in keyof T & keyof AggregatePrediction_leaderboard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrediction_leaderboard[P]>
      : GetScalarType<T[P], AggregatePrediction_leaderboard[P]>
  }




  export type prediction_leaderboardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: prediction_leaderboardWhereInput
    orderBy?: prediction_leaderboardOrderByWithAggregationInput | prediction_leaderboardOrderByWithAggregationInput[]
    by: Prediction_leaderboardScalarFieldEnum[] | Prediction_leaderboardScalarFieldEnum
    having?: prediction_leaderboardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Prediction_leaderboardCountAggregateInputType | true
    _avg?: Prediction_leaderboardAvgAggregateInputType
    _sum?: Prediction_leaderboardSumAggregateInputType
    _min?: Prediction_leaderboardMinAggregateInputType
    _max?: Prediction_leaderboardMaxAggregateInputType
  }

  export type Prediction_leaderboardGroupByOutputType = {
    id: string
    v: number
    pair: string
    predictedAt: string
    predictedPrice: number
    targetDate: string
    walletAddress: string
    walletType: string
    _count: Prediction_leaderboardCountAggregateOutputType | null
    _avg: Prediction_leaderboardAvgAggregateOutputType | null
    _sum: Prediction_leaderboardSumAggregateOutputType | null
    _min: Prediction_leaderboardMinAggregateOutputType | null
    _max: Prediction_leaderboardMaxAggregateOutputType | null
  }

  type GetPrediction_leaderboardGroupByPayload<T extends prediction_leaderboardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Prediction_leaderboardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Prediction_leaderboardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Prediction_leaderboardGroupByOutputType[P]>
            : GetScalarType<T[P], Prediction_leaderboardGroupByOutputType[P]>
        }
      >
    >


  export type prediction_leaderboardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    v?: boolean
    pair?: boolean
    predictedAt?: boolean
    predictedPrice?: boolean
    targetDate?: boolean
    walletAddress?: boolean
    walletType?: boolean
  }, ExtArgs["result"]["prediction_leaderboard"]>



  export type prediction_leaderboardSelectScalar = {
    id?: boolean
    v?: boolean
    pair?: boolean
    predictedAt?: boolean
    predictedPrice?: boolean
    targetDate?: boolean
    walletAddress?: boolean
    walletType?: boolean
  }

  export type prediction_leaderboardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "v" | "pair" | "predictedAt" | "predictedPrice" | "targetDate" | "walletAddress" | "walletType", ExtArgs["result"]["prediction_leaderboard"]>

  export type $prediction_leaderboardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "prediction_leaderboard"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      v: number
      pair: string
      predictedAt: string
      predictedPrice: number
      targetDate: string
      walletAddress: string
      walletType: string
    }, ExtArgs["result"]["prediction_leaderboard"]>
    composites: {}
  }

  type prediction_leaderboardGetPayload<S extends boolean | null | undefined | prediction_leaderboardDefaultArgs> = $Result.GetResult<Prisma.$prediction_leaderboardPayload, S>

  type prediction_leaderboardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<prediction_leaderboardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Prediction_leaderboardCountAggregateInputType | true
    }

  export interface prediction_leaderboardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['prediction_leaderboard'], meta: { name: 'prediction_leaderboard' } }
    /**
     * Find zero or one Prediction_leaderboard that matches the filter.
     * @param {prediction_leaderboardFindUniqueArgs} args - Arguments to find a Prediction_leaderboard
     * @example
     * // Get one Prediction_leaderboard
     * const prediction_leaderboard = await prisma.prediction_leaderboard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends prediction_leaderboardFindUniqueArgs>(args: SelectSubset<T, prediction_leaderboardFindUniqueArgs<ExtArgs>>): Prisma__prediction_leaderboardClient<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prediction_leaderboard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {prediction_leaderboardFindUniqueOrThrowArgs} args - Arguments to find a Prediction_leaderboard
     * @example
     * // Get one Prediction_leaderboard
     * const prediction_leaderboard = await prisma.prediction_leaderboard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends prediction_leaderboardFindUniqueOrThrowArgs>(args: SelectSubset<T, prediction_leaderboardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__prediction_leaderboardClient<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prediction_leaderboard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prediction_leaderboardFindFirstArgs} args - Arguments to find a Prediction_leaderboard
     * @example
     * // Get one Prediction_leaderboard
     * const prediction_leaderboard = await prisma.prediction_leaderboard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends prediction_leaderboardFindFirstArgs>(args?: SelectSubset<T, prediction_leaderboardFindFirstArgs<ExtArgs>>): Prisma__prediction_leaderboardClient<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prediction_leaderboard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prediction_leaderboardFindFirstOrThrowArgs} args - Arguments to find a Prediction_leaderboard
     * @example
     * // Get one Prediction_leaderboard
     * const prediction_leaderboard = await prisma.prediction_leaderboard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends prediction_leaderboardFindFirstOrThrowArgs>(args?: SelectSubset<T, prediction_leaderboardFindFirstOrThrowArgs<ExtArgs>>): Prisma__prediction_leaderboardClient<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prediction_leaderboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prediction_leaderboardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prediction_leaderboards
     * const prediction_leaderboards = await prisma.prediction_leaderboard.findMany()
     * 
     * // Get first 10 Prediction_leaderboards
     * const prediction_leaderboards = await prisma.prediction_leaderboard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prediction_leaderboardWithIdOnly = await prisma.prediction_leaderboard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends prediction_leaderboardFindManyArgs>(args?: SelectSubset<T, prediction_leaderboardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prediction_leaderboard.
     * @param {prediction_leaderboardCreateArgs} args - Arguments to create a Prediction_leaderboard.
     * @example
     * // Create one Prediction_leaderboard
     * const Prediction_leaderboard = await prisma.prediction_leaderboard.create({
     *   data: {
     *     // ... data to create a Prediction_leaderboard
     *   }
     * })
     * 
     */
    create<T extends prediction_leaderboardCreateArgs>(args: SelectSubset<T, prediction_leaderboardCreateArgs<ExtArgs>>): Prisma__prediction_leaderboardClient<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prediction_leaderboards.
     * @param {prediction_leaderboardCreateManyArgs} args - Arguments to create many Prediction_leaderboards.
     * @example
     * // Create many Prediction_leaderboards
     * const prediction_leaderboard = await prisma.prediction_leaderboard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends prediction_leaderboardCreateManyArgs>(args?: SelectSubset<T, prediction_leaderboardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Prediction_leaderboard.
     * @param {prediction_leaderboardDeleteArgs} args - Arguments to delete one Prediction_leaderboard.
     * @example
     * // Delete one Prediction_leaderboard
     * const Prediction_leaderboard = await prisma.prediction_leaderboard.delete({
     *   where: {
     *     // ... filter to delete one Prediction_leaderboard
     *   }
     * })
     * 
     */
    delete<T extends prediction_leaderboardDeleteArgs>(args: SelectSubset<T, prediction_leaderboardDeleteArgs<ExtArgs>>): Prisma__prediction_leaderboardClient<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prediction_leaderboard.
     * @param {prediction_leaderboardUpdateArgs} args - Arguments to update one Prediction_leaderboard.
     * @example
     * // Update one Prediction_leaderboard
     * const prediction_leaderboard = await prisma.prediction_leaderboard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends prediction_leaderboardUpdateArgs>(args: SelectSubset<T, prediction_leaderboardUpdateArgs<ExtArgs>>): Prisma__prediction_leaderboardClient<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prediction_leaderboards.
     * @param {prediction_leaderboardDeleteManyArgs} args - Arguments to filter Prediction_leaderboards to delete.
     * @example
     * // Delete a few Prediction_leaderboards
     * const { count } = await prisma.prediction_leaderboard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends prediction_leaderboardDeleteManyArgs>(args?: SelectSubset<T, prediction_leaderboardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prediction_leaderboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prediction_leaderboardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prediction_leaderboards
     * const prediction_leaderboard = await prisma.prediction_leaderboard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends prediction_leaderboardUpdateManyArgs>(args: SelectSubset<T, prediction_leaderboardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prediction_leaderboard.
     * @param {prediction_leaderboardUpsertArgs} args - Arguments to update or create a Prediction_leaderboard.
     * @example
     * // Update or create a Prediction_leaderboard
     * const prediction_leaderboard = await prisma.prediction_leaderboard.upsert({
     *   create: {
     *     // ... data to create a Prediction_leaderboard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prediction_leaderboard we want to update
     *   }
     * })
     */
    upsert<T extends prediction_leaderboardUpsertArgs>(args: SelectSubset<T, prediction_leaderboardUpsertArgs<ExtArgs>>): Prisma__prediction_leaderboardClient<$Result.GetResult<Prisma.$prediction_leaderboardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prediction_leaderboards that matches the filter.
     * @param {prediction_leaderboardFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const prediction_leaderboard = await prisma.prediction_leaderboard.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: prediction_leaderboardFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Prediction_leaderboard.
     * @param {prediction_leaderboardAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const prediction_leaderboard = await prisma.prediction_leaderboard.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: prediction_leaderboardAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Prediction_leaderboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prediction_leaderboardCountArgs} args - Arguments to filter Prediction_leaderboards to count.
     * @example
     * // Count the number of Prediction_leaderboards
     * const count = await prisma.prediction_leaderboard.count({
     *   where: {
     *     // ... the filter for the Prediction_leaderboards we want to count
     *   }
     * })
    **/
    count<T extends prediction_leaderboardCountArgs>(
      args?: Subset<T, prediction_leaderboardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Prediction_leaderboardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prediction_leaderboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Prediction_leaderboardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Prediction_leaderboardAggregateArgs>(args: Subset<T, Prediction_leaderboardAggregateArgs>): Prisma.PrismaPromise<GetPrediction_leaderboardAggregateType<T>>

    /**
     * Group by Prediction_leaderboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prediction_leaderboardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends prediction_leaderboardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: prediction_leaderboardGroupByArgs['orderBy'] }
        : { orderBy?: prediction_leaderboardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, prediction_leaderboardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrediction_leaderboardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the prediction_leaderboard model
   */
  readonly fields: prediction_leaderboardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for prediction_leaderboard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__prediction_leaderboardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the prediction_leaderboard model
   */
  interface prediction_leaderboardFieldRefs {
    readonly id: FieldRef<"prediction_leaderboard", 'String'>
    readonly v: FieldRef<"prediction_leaderboard", 'Int'>
    readonly pair: FieldRef<"prediction_leaderboard", 'String'>
    readonly predictedAt: FieldRef<"prediction_leaderboard", 'String'>
    readonly predictedPrice: FieldRef<"prediction_leaderboard", 'Float'>
    readonly targetDate: FieldRef<"prediction_leaderboard", 'String'>
    readonly walletAddress: FieldRef<"prediction_leaderboard", 'String'>
    readonly walletType: FieldRef<"prediction_leaderboard", 'String'>
  }
    

  // Custom InputTypes
  /**
   * prediction_leaderboard findUnique
   */
  export type prediction_leaderboardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * Filter, which prediction_leaderboard to fetch.
     */
    where: prediction_leaderboardWhereUniqueInput
  }

  /**
   * prediction_leaderboard findUniqueOrThrow
   */
  export type prediction_leaderboardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * Filter, which prediction_leaderboard to fetch.
     */
    where: prediction_leaderboardWhereUniqueInput
  }

  /**
   * prediction_leaderboard findFirst
   */
  export type prediction_leaderboardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * Filter, which prediction_leaderboard to fetch.
     */
    where?: prediction_leaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prediction_leaderboards to fetch.
     */
    orderBy?: prediction_leaderboardOrderByWithRelationInput | prediction_leaderboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for prediction_leaderboards.
     */
    cursor?: prediction_leaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prediction_leaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prediction_leaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of prediction_leaderboards.
     */
    distinct?: Prediction_leaderboardScalarFieldEnum | Prediction_leaderboardScalarFieldEnum[]
  }

  /**
   * prediction_leaderboard findFirstOrThrow
   */
  export type prediction_leaderboardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * Filter, which prediction_leaderboard to fetch.
     */
    where?: prediction_leaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prediction_leaderboards to fetch.
     */
    orderBy?: prediction_leaderboardOrderByWithRelationInput | prediction_leaderboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for prediction_leaderboards.
     */
    cursor?: prediction_leaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prediction_leaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prediction_leaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of prediction_leaderboards.
     */
    distinct?: Prediction_leaderboardScalarFieldEnum | Prediction_leaderboardScalarFieldEnum[]
  }

  /**
   * prediction_leaderboard findMany
   */
  export type prediction_leaderboardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * Filter, which prediction_leaderboards to fetch.
     */
    where?: prediction_leaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prediction_leaderboards to fetch.
     */
    orderBy?: prediction_leaderboardOrderByWithRelationInput | prediction_leaderboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing prediction_leaderboards.
     */
    cursor?: prediction_leaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prediction_leaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prediction_leaderboards.
     */
    skip?: number
    distinct?: Prediction_leaderboardScalarFieldEnum | Prediction_leaderboardScalarFieldEnum[]
  }

  /**
   * prediction_leaderboard create
   */
  export type prediction_leaderboardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * The data needed to create a prediction_leaderboard.
     */
    data: XOR<prediction_leaderboardCreateInput, prediction_leaderboardUncheckedCreateInput>
  }

  /**
   * prediction_leaderboard createMany
   */
  export type prediction_leaderboardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many prediction_leaderboards.
     */
    data: prediction_leaderboardCreateManyInput | prediction_leaderboardCreateManyInput[]
  }

  /**
   * prediction_leaderboard update
   */
  export type prediction_leaderboardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * The data needed to update a prediction_leaderboard.
     */
    data: XOR<prediction_leaderboardUpdateInput, prediction_leaderboardUncheckedUpdateInput>
    /**
     * Choose, which prediction_leaderboard to update.
     */
    where: prediction_leaderboardWhereUniqueInput
  }

  /**
   * prediction_leaderboard updateMany
   */
  export type prediction_leaderboardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update prediction_leaderboards.
     */
    data: XOR<prediction_leaderboardUpdateManyMutationInput, prediction_leaderboardUncheckedUpdateManyInput>
    /**
     * Filter which prediction_leaderboards to update
     */
    where?: prediction_leaderboardWhereInput
    /**
     * Limit how many prediction_leaderboards to update.
     */
    limit?: number
  }

  /**
   * prediction_leaderboard upsert
   */
  export type prediction_leaderboardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * The filter to search for the prediction_leaderboard to update in case it exists.
     */
    where: prediction_leaderboardWhereUniqueInput
    /**
     * In case the prediction_leaderboard found by the `where` argument doesn't exist, create a new prediction_leaderboard with this data.
     */
    create: XOR<prediction_leaderboardCreateInput, prediction_leaderboardUncheckedCreateInput>
    /**
     * In case the prediction_leaderboard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<prediction_leaderboardUpdateInput, prediction_leaderboardUncheckedUpdateInput>
  }

  /**
   * prediction_leaderboard delete
   */
  export type prediction_leaderboardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
    /**
     * Filter which prediction_leaderboard to delete.
     */
    where: prediction_leaderboardWhereUniqueInput
  }

  /**
   * prediction_leaderboard deleteMany
   */
  export type prediction_leaderboardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which prediction_leaderboards to delete
     */
    where?: prediction_leaderboardWhereInput
    /**
     * Limit how many prediction_leaderboards to delete.
     */
    limit?: number
  }

  /**
   * prediction_leaderboard findRaw
   */
  export type prediction_leaderboardFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * prediction_leaderboard aggregateRaw
   */
  export type prediction_leaderboardAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * prediction_leaderboard without action
   */
  export type prediction_leaderboardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prediction_leaderboard
     */
    select?: prediction_leaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prediction_leaderboard
     */
    omit?: prediction_leaderboardOmit<ExtArgs> | null
  }


  /**
   * Model predictions
   */

  export type AggregatePredictions = {
    _count: PredictionsCountAggregateOutputType | null
    _min: PredictionsMinAggregateOutputType | null
    _max: PredictionsMaxAggregateOutputType | null
  }

  export type PredictionsMinAggregateOutputType = {
    lastUpdated: string | null
    symbol: string | null
    targetDate: string | null
  }

  export type PredictionsMaxAggregateOutputType = {
    lastUpdated: string | null
    symbol: string | null
    targetDate: string | null
  }

  export type PredictionsCountAggregateOutputType = {
    id: number
    CurrentPredictions: number
    NextRoundPredictions: number
    lastUpdated: number
    symbol: number
    targetDate: number
    _all: number
  }


  export type PredictionsMinAggregateInputType = {
    lastUpdated?: true
    symbol?: true
    targetDate?: true
  }

  export type PredictionsMaxAggregateInputType = {
    lastUpdated?: true
    symbol?: true
    targetDate?: true
  }

  export type PredictionsCountAggregateInputType = {
    id?: true
    CurrentPredictions?: true
    NextRoundPredictions?: true
    lastUpdated?: true
    symbol?: true
    targetDate?: true
    _all?: true
  }

  export type PredictionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which predictions to aggregate.
     */
    where?: predictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictions to fetch.
     */
    orderBy?: predictionsOrderByWithRelationInput | predictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: predictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned predictions
    **/
    _count?: true | PredictionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PredictionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PredictionsMaxAggregateInputType
  }

  export type GetPredictionsAggregateType<T extends PredictionsAggregateArgs> = {
        [P in keyof T & keyof AggregatePredictions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePredictions[P]>
      : GetScalarType<T[P], AggregatePredictions[P]>
  }




  export type predictionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: predictionsWhereInput
    orderBy?: predictionsOrderByWithAggregationInput | predictionsOrderByWithAggregationInput[]
    by: PredictionsScalarFieldEnum[] | PredictionsScalarFieldEnum
    having?: predictionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PredictionsCountAggregateInputType | true
    _min?: PredictionsMinAggregateInputType
    _max?: PredictionsMaxAggregateInputType
  }

  export type PredictionsGroupByOutputType = {
    id: JsonValue
    CurrentPredictions: JsonValue
    NextRoundPredictions: JsonValue
    lastUpdated: string
    symbol: string
    targetDate: string
    _count: PredictionsCountAggregateOutputType | null
    _min: PredictionsMinAggregateOutputType | null
    _max: PredictionsMaxAggregateOutputType | null
  }

  type GetPredictionsGroupByPayload<T extends predictionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PredictionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PredictionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PredictionsGroupByOutputType[P]>
            : GetScalarType<T[P], PredictionsGroupByOutputType[P]>
        }
      >
    >


  export type predictionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CurrentPredictions?: boolean
    NextRoundPredictions?: boolean
    lastUpdated?: boolean
    messagesCurrentAnalysis?: boolean | PredictionsMessagesCurrentAnalysisDefaultArgs<ExtArgs>
    symbol?: boolean
    targetDate?: boolean
  }, ExtArgs["result"]["predictions"]>



  export type predictionsSelectScalar = {
    id?: boolean
    CurrentPredictions?: boolean
    NextRoundPredictions?: boolean
    lastUpdated?: boolean
    symbol?: boolean
    targetDate?: boolean
  }

  export type predictionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "CurrentPredictions" | "NextRoundPredictions" | "lastUpdated" | "messagesCurrentAnalysis" | "symbol" | "targetDate", ExtArgs["result"]["predictions"]>
  export type predictionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $predictionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "predictions"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      /**
       * Multiple data types found: String: 16.7%, String (ObjectId): 83.3% out of 6 sampled entries
       */
      id: Prisma.JsonValue
      /**
       * Nested objects had no data in the sample dataset to introspect a nested type.
       */
      CurrentPredictions: Prisma.JsonValue
      /**
       * Nested objects had no data in the sample dataset to introspect a nested type.
       */
      NextRoundPredictions: Prisma.JsonValue
      lastUpdated: string
      symbol: string
      targetDate: string
    }, ExtArgs["result"]["predictions"]>
    composites: {
      messagesCurrentAnalysis: Prisma.$PredictionsMessagesCurrentAnalysisPayload
    }
  }

  type predictionsGetPayload<S extends boolean | null | undefined | predictionsDefaultArgs> = $Result.GetResult<Prisma.$predictionsPayload, S>

  type predictionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<predictionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PredictionsCountAggregateInputType | true
    }

  export interface predictionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['predictions'], meta: { name: 'predictions' } }
    /**
     * Find zero or one Predictions that matches the filter.
     * @param {predictionsFindUniqueArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends predictionsFindUniqueArgs>(args: SelectSubset<T, predictionsFindUniqueArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Predictions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {predictionsFindUniqueOrThrowArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends predictionsFindUniqueOrThrowArgs>(args: SelectSubset<T, predictionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Predictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsFindFirstArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends predictionsFindFirstArgs>(args?: SelectSubset<T, predictionsFindFirstArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Predictions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsFindFirstOrThrowArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends predictionsFindFirstOrThrowArgs>(args?: SelectSubset<T, predictionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Predictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Predictions
     * const predictions = await prisma.predictions.findMany()
     * 
     * // Get first 10 Predictions
     * const predictions = await prisma.predictions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const predictionsWithIdOnly = await prisma.predictions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends predictionsFindManyArgs>(args?: SelectSubset<T, predictionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Predictions.
     * @param {predictionsCreateArgs} args - Arguments to create a Predictions.
     * @example
     * // Create one Predictions
     * const Predictions = await prisma.predictions.create({
     *   data: {
     *     // ... data to create a Predictions
     *   }
     * })
     * 
     */
    create<T extends predictionsCreateArgs>(args: SelectSubset<T, predictionsCreateArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Predictions.
     * @param {predictionsCreateManyArgs} args - Arguments to create many Predictions.
     * @example
     * // Create many Predictions
     * const predictions = await prisma.predictions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends predictionsCreateManyArgs>(args?: SelectSubset<T, predictionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Predictions.
     * @param {predictionsDeleteArgs} args - Arguments to delete one Predictions.
     * @example
     * // Delete one Predictions
     * const Predictions = await prisma.predictions.delete({
     *   where: {
     *     // ... filter to delete one Predictions
     *   }
     * })
     * 
     */
    delete<T extends predictionsDeleteArgs>(args: SelectSubset<T, predictionsDeleteArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Predictions.
     * @param {predictionsUpdateArgs} args - Arguments to update one Predictions.
     * @example
     * // Update one Predictions
     * const predictions = await prisma.predictions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends predictionsUpdateArgs>(args: SelectSubset<T, predictionsUpdateArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Predictions.
     * @param {predictionsDeleteManyArgs} args - Arguments to filter Predictions to delete.
     * @example
     * // Delete a few Predictions
     * const { count } = await prisma.predictions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends predictionsDeleteManyArgs>(args?: SelectSubset<T, predictionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Predictions
     * const predictions = await prisma.predictions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends predictionsUpdateManyArgs>(args: SelectSubset<T, predictionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Predictions.
     * @param {predictionsUpsertArgs} args - Arguments to update or create a Predictions.
     * @example
     * // Update or create a Predictions
     * const predictions = await prisma.predictions.upsert({
     *   create: {
     *     // ... data to create a Predictions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Predictions we want to update
     *   }
     * })
     */
    upsert<T extends predictionsUpsertArgs>(args: SelectSubset<T, predictionsUpsertArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Predictions that matches the filter.
     * @param {predictionsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const predictions = await prisma.predictions.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: predictionsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Predictions.
     * @param {predictionsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const predictions = await prisma.predictions.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: predictionsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsCountArgs} args - Arguments to filter Predictions to count.
     * @example
     * // Count the number of Predictions
     * const count = await prisma.predictions.count({
     *   where: {
     *     // ... the filter for the Predictions we want to count
     *   }
     * })
    **/
    count<T extends predictionsCountArgs>(
      args?: Subset<T, predictionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PredictionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PredictionsAggregateArgs>(args: Subset<T, PredictionsAggregateArgs>): Prisma.PrismaPromise<GetPredictionsAggregateType<T>>

    /**
     * Group by Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends predictionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: predictionsGroupByArgs['orderBy'] }
        : { orderBy?: predictionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, predictionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the predictions model
   */
  readonly fields: predictionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for predictions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__predictionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the predictions model
   */
  interface predictionsFieldRefs {
    readonly id: FieldRef<"predictions", 'Json'>
    readonly CurrentPredictions: FieldRef<"predictions", 'Json'>
    readonly NextRoundPredictions: FieldRef<"predictions", 'Json'>
    readonly lastUpdated: FieldRef<"predictions", 'String'>
    readonly symbol: FieldRef<"predictions", 'String'>
    readonly targetDate: FieldRef<"predictions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * predictions findUnique
   */
  export type predictionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where: predictionsWhereUniqueInput
  }

  /**
   * predictions findUniqueOrThrow
   */
  export type predictionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where: predictionsWhereUniqueInput
  }

  /**
   * predictions findFirst
   */
  export type predictionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where?: predictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictions to fetch.
     */
    orderBy?: predictionsOrderByWithRelationInput | predictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for predictions.
     */
    cursor?: predictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of predictions.
     */
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * predictions findFirstOrThrow
   */
  export type predictionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where?: predictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictions to fetch.
     */
    orderBy?: predictionsOrderByWithRelationInput | predictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for predictions.
     */
    cursor?: predictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of predictions.
     */
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * predictions findMany
   */
  export type predictionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where?: predictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictions to fetch.
     */
    orderBy?: predictionsOrderByWithRelationInput | predictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing predictions.
     */
    cursor?: predictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictions.
     */
    skip?: number
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * predictions create
   */
  export type predictionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * The data needed to create a predictions.
     */
    data: XOR<predictionsCreateInput, predictionsUncheckedCreateInput>
  }

  /**
   * predictions createMany
   */
  export type predictionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many predictions.
     */
    data: predictionsCreateManyInput | predictionsCreateManyInput[]
  }

  /**
   * predictions update
   */
  export type predictionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * The data needed to update a predictions.
     */
    data: XOR<predictionsUpdateInput, predictionsUncheckedUpdateInput>
    /**
     * Choose, which predictions to update.
     */
    where: predictionsWhereUniqueInput
  }

  /**
   * predictions updateMany
   */
  export type predictionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update predictions.
     */
    data: XOR<predictionsUpdateManyMutationInput, predictionsUncheckedUpdateManyInput>
    /**
     * Filter which predictions to update
     */
    where?: predictionsWhereInput
    /**
     * Limit how many predictions to update.
     */
    limit?: number
  }

  /**
   * predictions upsert
   */
  export type predictionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * The filter to search for the predictions to update in case it exists.
     */
    where: predictionsWhereUniqueInput
    /**
     * In case the predictions found by the `where` argument doesn't exist, create a new predictions with this data.
     */
    create: XOR<predictionsCreateInput, predictionsUncheckedCreateInput>
    /**
     * In case the predictions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<predictionsUpdateInput, predictionsUncheckedUpdateInput>
  }

  /**
   * predictions delete
   */
  export type predictionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
    /**
     * Filter which predictions to delete.
     */
    where: predictionsWhereUniqueInput
  }

  /**
   * predictions deleteMany
   */
  export type predictionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which predictions to delete
     */
    where?: predictionsWhereInput
    /**
     * Limit how many predictions to delete.
     */
    limit?: number
  }

  /**
   * predictions findRaw
   */
  export type predictionsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * predictions aggregateRaw
   */
  export type predictionsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * predictions without action
   */
  export type predictionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the predictions
     */
    omit?: predictionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: predictionsInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    v: number | null
  }

  export type UsersSumAggregateOutputType = {
    v: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    v: number | null
    createdAt: Date | null
    email: string | null
    password: string | null
    updatedAt: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    v: number | null
    createdAt: Date | null
    email: string | null
    password: string | null
    updatedAt: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    v: number
    createdAt: number
    email: number
    password: number
    predictions: number
    updatedAt: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    v?: true
  }

  export type UsersSumAggregateInputType = {
    v?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    v?: true
    createdAt?: true
    email?: true
    password?: true
    updatedAt?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    v?: true
    createdAt?: true
    email?: true
    password?: true
    updatedAt?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    v?: true
    createdAt?: true
    email?: true
    password?: true
    predictions?: true
    updatedAt?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    v: number
    createdAt: Date
    email: string
    password: string
    predictions: JsonValue | null
    updatedAt: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    v?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    predictions?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    id?: boolean
    v?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    predictions?: boolean
    updatedAt?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "v" | "createdAt" | "email" | "password" | "predictions" | "updatedAt", ExtArgs["result"]["users"]>

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      v: number
      createdAt: Date
      email: string
      password: string
      predictions: Prisma.JsonValue | null
      updatedAt: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {usersFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const users = await prisma.users.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: usersFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Users.
     * @param {usersAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const users = await prisma.users.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: usersAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly v: FieldRef<"users", 'Int'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly predictions: FieldRef<"users", 'Json'>
    readonly updatedAt: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users findRaw
   */
  export type usersFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * users aggregateRaw
   */
  export type usersAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const Agent_predictions_historyScalarFieldEnum: {
    id: 'id',
    agent: 'agent',
    pair: 'pair',
    timestamp: 'timestamp'
  };

  export type Agent_predictions_historyScalarFieldEnum = (typeof Agent_predictions_historyScalarFieldEnum)[keyof typeof Agent_predictions_historyScalarFieldEnum]


  export const Prediction_leaderboardScalarFieldEnum: {
    id: 'id',
    v: 'v',
    pair: 'pair',
    predictedAt: 'predictedAt',
    predictedPrice: 'predictedPrice',
    targetDate: 'targetDate',
    walletAddress: 'walletAddress',
    walletType: 'walletType'
  };

  export type Prediction_leaderboardScalarFieldEnum = (typeof Prediction_leaderboardScalarFieldEnum)[keyof typeof Prediction_leaderboardScalarFieldEnum]


  export const PredictionsScalarFieldEnum: {
    id: 'id',
    CurrentPredictions: 'CurrentPredictions',
    NextRoundPredictions: 'NextRoundPredictions',
    lastUpdated: 'lastUpdated',
    symbol: 'symbol',
    targetDate: 'targetDate'
  };

  export type PredictionsScalarFieldEnum = (typeof PredictionsScalarFieldEnum)[keyof typeof PredictionsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    v: 'v',
    createdAt: 'createdAt',
    email: 'email',
    password: 'password',
    predictions: 'predictions',
    updatedAt: 'updatedAt'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type agent_predictions_historyWhereInput = {
    AND?: agent_predictions_historyWhereInput | agent_predictions_historyWhereInput[]
    OR?: agent_predictions_historyWhereInput[]
    NOT?: agent_predictions_historyWhereInput | agent_predictions_historyWhereInput[]
    id?: StringFilter<"agent_predictions_history"> | string
    agent?: JsonNullableFilter<"agent_predictions_history">
    pair?: JsonNullableFilter<"agent_predictions_history">
    past_seven_predictions?: AgentPredictionsHistoryPastSevenPredictionsCompositeListFilter | AgentPredictionsHistoryPastSevenPredictionsObjectEqualityInput[]
    timestamp?: JsonNullableFilter<"agent_predictions_history">
  }

  export type agent_predictions_historyOrderByWithRelationInput = {
    id?: SortOrder
    agent?: SortOrder
    pair?: SortOrder
    past_seven_predictions?: AgentPredictionsHistoryPastSevenPredictionsOrderByCompositeAggregateInput
    timestamp?: SortOrder
  }

  export type agent_predictions_historyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: agent_predictions_historyWhereInput | agent_predictions_historyWhereInput[]
    OR?: agent_predictions_historyWhereInput[]
    NOT?: agent_predictions_historyWhereInput | agent_predictions_historyWhereInput[]
    agent?: JsonNullableFilter<"agent_predictions_history">
    pair?: JsonNullableFilter<"agent_predictions_history">
    past_seven_predictions?: AgentPredictionsHistoryPastSevenPredictionsCompositeListFilter | AgentPredictionsHistoryPastSevenPredictionsObjectEqualityInput[]
    timestamp?: JsonNullableFilter<"agent_predictions_history">
  }, "id">

  export type agent_predictions_historyOrderByWithAggregationInput = {
    id?: SortOrder
    agent?: SortOrder
    pair?: SortOrder
    timestamp?: SortOrder
    _count?: agent_predictions_historyCountOrderByAggregateInput
    _max?: agent_predictions_historyMaxOrderByAggregateInput
    _min?: agent_predictions_historyMinOrderByAggregateInput
  }

  export type agent_predictions_historyScalarWhereWithAggregatesInput = {
    AND?: agent_predictions_historyScalarWhereWithAggregatesInput | agent_predictions_historyScalarWhereWithAggregatesInput[]
    OR?: agent_predictions_historyScalarWhereWithAggregatesInput[]
    NOT?: agent_predictions_historyScalarWhereWithAggregatesInput | agent_predictions_historyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"agent_predictions_history"> | string
    agent?: JsonNullableWithAggregatesFilter<"agent_predictions_history">
    pair?: JsonNullableWithAggregatesFilter<"agent_predictions_history">
    timestamp?: JsonNullableWithAggregatesFilter<"agent_predictions_history">
  }

  export type prediction_leaderboardWhereInput = {
    AND?: prediction_leaderboardWhereInput | prediction_leaderboardWhereInput[]
    OR?: prediction_leaderboardWhereInput[]
    NOT?: prediction_leaderboardWhereInput | prediction_leaderboardWhereInput[]
    id?: StringFilter<"prediction_leaderboard"> | string
    v?: IntFilter<"prediction_leaderboard"> | number
    pair?: StringFilter<"prediction_leaderboard"> | string
    predictedAt?: StringFilter<"prediction_leaderboard"> | string
    predictedPrice?: FloatFilter<"prediction_leaderboard"> | number
    targetDate?: StringFilter<"prediction_leaderboard"> | string
    walletAddress?: StringFilter<"prediction_leaderboard"> | string
    walletType?: StringFilter<"prediction_leaderboard"> | string
  }

  export type prediction_leaderboardOrderByWithRelationInput = {
    id?: SortOrder
    v?: SortOrder
    pair?: SortOrder
    predictedAt?: SortOrder
    predictedPrice?: SortOrder
    targetDate?: SortOrder
    walletAddress?: SortOrder
    walletType?: SortOrder
  }

  export type prediction_leaderboardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: prediction_leaderboardWhereInput | prediction_leaderboardWhereInput[]
    OR?: prediction_leaderboardWhereInput[]
    NOT?: prediction_leaderboardWhereInput | prediction_leaderboardWhereInput[]
    v?: IntFilter<"prediction_leaderboard"> | number
    pair?: StringFilter<"prediction_leaderboard"> | string
    predictedAt?: StringFilter<"prediction_leaderboard"> | string
    predictedPrice?: FloatFilter<"prediction_leaderboard"> | number
    targetDate?: StringFilter<"prediction_leaderboard"> | string
    walletAddress?: StringFilter<"prediction_leaderboard"> | string
    walletType?: StringFilter<"prediction_leaderboard"> | string
  }, "id">

  export type prediction_leaderboardOrderByWithAggregationInput = {
    id?: SortOrder
    v?: SortOrder
    pair?: SortOrder
    predictedAt?: SortOrder
    predictedPrice?: SortOrder
    targetDate?: SortOrder
    walletAddress?: SortOrder
    walletType?: SortOrder
    _count?: prediction_leaderboardCountOrderByAggregateInput
    _avg?: prediction_leaderboardAvgOrderByAggregateInput
    _max?: prediction_leaderboardMaxOrderByAggregateInput
    _min?: prediction_leaderboardMinOrderByAggregateInput
    _sum?: prediction_leaderboardSumOrderByAggregateInput
  }

  export type prediction_leaderboardScalarWhereWithAggregatesInput = {
    AND?: prediction_leaderboardScalarWhereWithAggregatesInput | prediction_leaderboardScalarWhereWithAggregatesInput[]
    OR?: prediction_leaderboardScalarWhereWithAggregatesInput[]
    NOT?: prediction_leaderboardScalarWhereWithAggregatesInput | prediction_leaderboardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"prediction_leaderboard"> | string
    v?: IntWithAggregatesFilter<"prediction_leaderboard"> | number
    pair?: StringWithAggregatesFilter<"prediction_leaderboard"> | string
    predictedAt?: StringWithAggregatesFilter<"prediction_leaderboard"> | string
    predictedPrice?: FloatWithAggregatesFilter<"prediction_leaderboard"> | number
    targetDate?: StringWithAggregatesFilter<"prediction_leaderboard"> | string
    walletAddress?: StringWithAggregatesFilter<"prediction_leaderboard"> | string
    walletType?: StringWithAggregatesFilter<"prediction_leaderboard"> | string
  }

  export type predictionsWhereInput = {
    AND?: predictionsWhereInput | predictionsWhereInput[]
    OR?: predictionsWhereInput[]
    NOT?: predictionsWhereInput | predictionsWhereInput[]
    id?: JsonFilter<"predictions">
    CurrentPredictions?: JsonFilter<"predictions">
    NextRoundPredictions?: JsonFilter<"predictions">
    lastUpdated?: StringFilter<"predictions"> | string
    messagesCurrentAnalysis?: XOR<PredictionsMessagesCurrentAnalysisCompositeFilter, PredictionsMessagesCurrentAnalysisObjectEqualityInput>
    symbol?: StringFilter<"predictions"> | string
    targetDate?: StringFilter<"predictions"> | string
  }

  export type predictionsOrderByWithRelationInput = {
    id?: SortOrder
    CurrentPredictions?: SortOrder
    NextRoundPredictions?: SortOrder
    lastUpdated?: SortOrder
    messagesCurrentAnalysis?: PredictionsMessagesCurrentAnalysisOrderByInput
    symbol?: SortOrder
    targetDate?: SortOrder
  }

  export type predictionsWhereUniqueInput = Prisma.AtLeast<{
    id?: InputJsonValue
    symbol?: string
    AND?: predictionsWhereInput | predictionsWhereInput[]
    OR?: predictionsWhereInput[]
    NOT?: predictionsWhereInput | predictionsWhereInput[]
    CurrentPredictions?: JsonFilter<"predictions">
    NextRoundPredictions?: JsonFilter<"predictions">
    lastUpdated?: StringFilter<"predictions"> | string
    messagesCurrentAnalysis?: XOR<PredictionsMessagesCurrentAnalysisCompositeFilter, PredictionsMessagesCurrentAnalysisObjectEqualityInput>
    targetDate?: StringFilter<"predictions"> | string
  }, "id" | "symbol">

  export type predictionsOrderByWithAggregationInput = {
    id?: SortOrder
    CurrentPredictions?: SortOrder
    NextRoundPredictions?: SortOrder
    lastUpdated?: SortOrder
    symbol?: SortOrder
    targetDate?: SortOrder
    _count?: predictionsCountOrderByAggregateInput
    _max?: predictionsMaxOrderByAggregateInput
    _min?: predictionsMinOrderByAggregateInput
  }

  export type predictionsScalarWhereWithAggregatesInput = {
    AND?: predictionsScalarWhereWithAggregatesInput | predictionsScalarWhereWithAggregatesInput[]
    OR?: predictionsScalarWhereWithAggregatesInput[]
    NOT?: predictionsScalarWhereWithAggregatesInput | predictionsScalarWhereWithAggregatesInput[]
    id?: JsonWithAggregatesFilter<"predictions">
    CurrentPredictions?: JsonWithAggregatesFilter<"predictions">
    NextRoundPredictions?: JsonWithAggregatesFilter<"predictions">
    lastUpdated?: StringWithAggregatesFilter<"predictions"> | string
    symbol?: StringWithAggregatesFilter<"predictions"> | string
    targetDate?: StringWithAggregatesFilter<"predictions"> | string
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    v?: IntFilter<"users"> | number
    createdAt?: DateTimeFilter<"users"> | Date | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    predictions?: JsonNullableFilter<"users">
    updatedAt?: DateTimeFilter<"users"> | Date | string
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    v?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    predictions?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    v?: IntFilter<"users"> | number
    createdAt?: DateTimeFilter<"users"> | Date | string
    password?: StringFilter<"users"> | string
    predictions?: JsonNullableFilter<"users">
    updatedAt?: DateTimeFilter<"users"> | Date | string
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    v?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    predictions?: SortOrder
    updatedAt?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    v?: IntWithAggregatesFilter<"users"> | number
    createdAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    predictions?: JsonNullableWithAggregatesFilter<"users">
    updatedAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type agent_predictions_historyCreateInput = {
    id: string
    agent?: InputJsonValue | null
    pair?: InputJsonValue | null
    past_seven_predictions?: XOR<AgentPredictionsHistoryPastSevenPredictionsListCreateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsCreateInput> | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    timestamp?: InputJsonValue | null
  }

  export type agent_predictions_historyUncheckedCreateInput = {
    id: string
    agent?: InputJsonValue | null
    pair?: InputJsonValue | null
    past_seven_predictions?: XOR<AgentPredictionsHistoryPastSevenPredictionsListCreateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsCreateInput> | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    timestamp?: InputJsonValue | null
  }

  export type agent_predictions_historyUpdateInput = {
    agent?: InputJsonValue | InputJsonValue | null
    pair?: InputJsonValue | InputJsonValue | null
    past_seven_predictions?: XOR<AgentPredictionsHistoryPastSevenPredictionsListUpdateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsCreateInput> | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    timestamp?: InputJsonValue | InputJsonValue | null
  }

  export type agent_predictions_historyUncheckedUpdateInput = {
    agent?: InputJsonValue | InputJsonValue | null
    pair?: InputJsonValue | InputJsonValue | null
    past_seven_predictions?: XOR<AgentPredictionsHistoryPastSevenPredictionsListUpdateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsCreateInput> | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    timestamp?: InputJsonValue | InputJsonValue | null
  }

  export type agent_predictions_historyCreateManyInput = {
    id: string
    agent?: InputJsonValue | null
    pair?: InputJsonValue | null
    past_seven_predictions?: XOR<AgentPredictionsHistoryPastSevenPredictionsListCreateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsCreateInput> | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    timestamp?: InputJsonValue | null
  }

  export type agent_predictions_historyUpdateManyMutationInput = {
    agent?: InputJsonValue | InputJsonValue | null
    pair?: InputJsonValue | InputJsonValue | null
    past_seven_predictions?: XOR<AgentPredictionsHistoryPastSevenPredictionsListUpdateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsCreateInput> | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    timestamp?: InputJsonValue | InputJsonValue | null
  }

  export type agent_predictions_historyUncheckedUpdateManyInput = {
    agent?: InputJsonValue | InputJsonValue | null
    pair?: InputJsonValue | InputJsonValue | null
    past_seven_predictions?: XOR<AgentPredictionsHistoryPastSevenPredictionsListUpdateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsCreateInput> | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    timestamp?: InputJsonValue | InputJsonValue | null
  }

  export type prediction_leaderboardCreateInput = {
    id: string
    v: number
    pair: string
    predictedAt: string
    predictedPrice: number
    targetDate: string
    walletAddress: string
    walletType: string
  }

  export type prediction_leaderboardUncheckedCreateInput = {
    id: string
    v: number
    pair: string
    predictedAt: string
    predictedPrice: number
    targetDate: string
    walletAddress: string
    walletType: string
  }

  export type prediction_leaderboardUpdateInput = {
    v?: IntFieldUpdateOperationsInput | number
    pair?: StringFieldUpdateOperationsInput | string
    predictedAt?: StringFieldUpdateOperationsInput | string
    predictedPrice?: FloatFieldUpdateOperationsInput | number
    targetDate?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletType?: StringFieldUpdateOperationsInput | string
  }

  export type prediction_leaderboardUncheckedUpdateInput = {
    v?: IntFieldUpdateOperationsInput | number
    pair?: StringFieldUpdateOperationsInput | string
    predictedAt?: StringFieldUpdateOperationsInput | string
    predictedPrice?: FloatFieldUpdateOperationsInput | number
    targetDate?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletType?: StringFieldUpdateOperationsInput | string
  }

  export type prediction_leaderboardCreateManyInput = {
    id: string
    v: number
    pair: string
    predictedAt: string
    predictedPrice: number
    targetDate: string
    walletAddress: string
    walletType: string
  }

  export type prediction_leaderboardUpdateManyMutationInput = {
    v?: IntFieldUpdateOperationsInput | number
    pair?: StringFieldUpdateOperationsInput | string
    predictedAt?: StringFieldUpdateOperationsInput | string
    predictedPrice?: FloatFieldUpdateOperationsInput | number
    targetDate?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletType?: StringFieldUpdateOperationsInput | string
  }

  export type prediction_leaderboardUncheckedUpdateManyInput = {
    v?: IntFieldUpdateOperationsInput | number
    pair?: StringFieldUpdateOperationsInput | string
    predictedAt?: StringFieldUpdateOperationsInput | string
    predictedPrice?: FloatFieldUpdateOperationsInput | number
    targetDate?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    walletType?: StringFieldUpdateOperationsInput | string
  }

  export type predictionsCreateInput = {
    id: InputJsonValue
    CurrentPredictions: InputJsonValue
    NextRoundPredictions: InputJsonValue
    lastUpdated: string
    messagesCurrentAnalysis: XOR<PredictionsMessagesCurrentAnalysisCreateEnvelopeInput, PredictionsMessagesCurrentAnalysisCreateInput>
    symbol: string
    targetDate: string
  }

  export type predictionsUncheckedCreateInput = {
    id: InputJsonValue
    CurrentPredictions: InputJsonValue
    NextRoundPredictions: InputJsonValue
    lastUpdated: string
    messagesCurrentAnalysis: XOR<PredictionsMessagesCurrentAnalysisCreateEnvelopeInput, PredictionsMessagesCurrentAnalysisCreateInput>
    symbol: string
    targetDate: string
  }

  export type predictionsUpdateInput = {
    CurrentPredictions?: InputJsonValue | InputJsonValue
    NextRoundPredictions?: InputJsonValue | InputJsonValue
    lastUpdated?: StringFieldUpdateOperationsInput | string
    messagesCurrentAnalysis?: XOR<PredictionsMessagesCurrentAnalysisUpdateEnvelopeInput, PredictionsMessagesCurrentAnalysisCreateInput>
    symbol?: StringFieldUpdateOperationsInput | string
    targetDate?: StringFieldUpdateOperationsInput | string
  }

  export type predictionsUncheckedUpdateInput = {
    CurrentPredictions?: InputJsonValue | InputJsonValue
    NextRoundPredictions?: InputJsonValue | InputJsonValue
    lastUpdated?: StringFieldUpdateOperationsInput | string
    messagesCurrentAnalysis?: XOR<PredictionsMessagesCurrentAnalysisUpdateEnvelopeInput, PredictionsMessagesCurrentAnalysisCreateInput>
    symbol?: StringFieldUpdateOperationsInput | string
    targetDate?: StringFieldUpdateOperationsInput | string
  }

  export type predictionsCreateManyInput = {
    id: InputJsonValue
    CurrentPredictions: InputJsonValue
    NextRoundPredictions: InputJsonValue
    lastUpdated: string
    messagesCurrentAnalysis: XOR<PredictionsMessagesCurrentAnalysisCreateEnvelopeInput, PredictionsMessagesCurrentAnalysisCreateInput>
    symbol: string
    targetDate: string
  }

  export type predictionsUpdateManyMutationInput = {
    CurrentPredictions?: InputJsonValue | InputJsonValue
    NextRoundPredictions?: InputJsonValue | InputJsonValue
    lastUpdated?: StringFieldUpdateOperationsInput | string
    messagesCurrentAnalysis?: XOR<PredictionsMessagesCurrentAnalysisUpdateEnvelopeInput, PredictionsMessagesCurrentAnalysisCreateInput>
    symbol?: StringFieldUpdateOperationsInput | string
    targetDate?: StringFieldUpdateOperationsInput | string
  }

  export type predictionsUncheckedUpdateManyInput = {
    CurrentPredictions?: InputJsonValue | InputJsonValue
    NextRoundPredictions?: InputJsonValue | InputJsonValue
    lastUpdated?: StringFieldUpdateOperationsInput | string
    messagesCurrentAnalysis?: XOR<PredictionsMessagesCurrentAnalysisUpdateEnvelopeInput, PredictionsMessagesCurrentAnalysisCreateInput>
    symbol?: StringFieldUpdateOperationsInput | string
    targetDate?: StringFieldUpdateOperationsInput | string
  }

  export type usersCreateInput = {
    id?: string
    v: number
    createdAt: Date | string
    email: string
    password: string
    predictions?: InputJsonValue | null
    updatedAt: Date | string
  }

  export type usersUncheckedCreateInput = {
    id?: string
    v: number
    createdAt: Date | string
    email: string
    password: string
    predictions?: InputJsonValue | null
    updatedAt: Date | string
  }

  export type usersUpdateInput = {
    v?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    predictions?: InputJsonValue | InputJsonValue | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateInput = {
    v?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    predictions?: InputJsonValue | InputJsonValue | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersCreateManyInput = {
    id?: string
    v: number
    createdAt: Date | string
    email: string
    password: string
    predictions?: InputJsonValue | null
    updatedAt: Date | string
  }

  export type usersUpdateManyMutationInput = {
    v?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    predictions?: InputJsonValue | InputJsonValue | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    v?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    predictions?: InputJsonValue | InputJsonValue | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCompositeListFilter = {
    equals?: AgentPredictionsHistoryPastSevenPredictionsObjectEqualityInput[]
    every?: AgentPredictionsHistoryPastSevenPredictionsWhereInput
    some?: AgentPredictionsHistoryPastSevenPredictionsWhereInput
    none?: AgentPredictionsHistoryPastSevenPredictionsWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsObjectEqualityInput = {
    ceoAgent: AgentPredictionsHistoryPastSevenPredictionsCeoAgentObjectEqualityInput
    lastUpdated: string
    resultPrice: AgentPredictionsHistoryPastSevenPredictionsResultPriceObjectEqualityInput
    targetDate: string
    technicalAgent: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentObjectEqualityInput
    timestamp: string
    wisdomOfCrowds: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsObjectEqualityInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type agent_predictions_historyCountOrderByAggregateInput = {
    id?: SortOrder
    agent?: SortOrder
    pair?: SortOrder
    timestamp?: SortOrder
  }

  export type agent_predictions_historyMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type agent_predictions_historyMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type prediction_leaderboardCountOrderByAggregateInput = {
    id?: SortOrder
    v?: SortOrder
    pair?: SortOrder
    predictedAt?: SortOrder
    predictedPrice?: SortOrder
    targetDate?: SortOrder
    walletAddress?: SortOrder
    walletType?: SortOrder
  }

  export type prediction_leaderboardAvgOrderByAggregateInput = {
    v?: SortOrder
    predictedPrice?: SortOrder
  }

  export type prediction_leaderboardMaxOrderByAggregateInput = {
    id?: SortOrder
    v?: SortOrder
    pair?: SortOrder
    predictedAt?: SortOrder
    predictedPrice?: SortOrder
    targetDate?: SortOrder
    walletAddress?: SortOrder
    walletType?: SortOrder
  }

  export type prediction_leaderboardMinOrderByAggregateInput = {
    id?: SortOrder
    v?: SortOrder
    pair?: SortOrder
    predictedAt?: SortOrder
    predictedPrice?: SortOrder
    targetDate?: SortOrder
    walletAddress?: SortOrder
    walletType?: SortOrder
  }

  export type prediction_leaderboardSumOrderByAggregateInput = {
    v?: SortOrder
    predictedPrice?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type PredictionsMessagesCurrentAnalysisCompositeFilter = {
    equals?: PredictionsMessagesCurrentAnalysisObjectEqualityInput
    is?: PredictionsMessagesCurrentAnalysisWhereInput
    isNot?: PredictionsMessagesCurrentAnalysisWhereInput
  }

  export type PredictionsMessagesCurrentAnalysisObjectEqualityInput = {
    CeoAgent?: string[]
    CrowdAnalystAgent?: string[]
    TechnicalAgent?: string[]
  }

  export type PredictionsMessagesCurrentAnalysisOrderByInput = {
    CeoAgent?: SortOrder
    CrowdAnalystAgent?: SortOrder
    TechnicalAgent?: SortOrder
  }

  export type predictionsCountOrderByAggregateInput = {
    id?: SortOrder
    CurrentPredictions?: SortOrder
    NextRoundPredictions?: SortOrder
    lastUpdated?: SortOrder
    symbol?: SortOrder
    targetDate?: SortOrder
  }

  export type predictionsMaxOrderByAggregateInput = {
    lastUpdated?: SortOrder
    symbol?: SortOrder
    targetDate?: SortOrder
  }

  export type predictionsMinOrderByAggregateInput = {
    lastUpdated?: SortOrder
    symbol?: SortOrder
    targetDate?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    v?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    predictions?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    v?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    v?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    v?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    v?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AgentPredictionsHistoryPastSevenPredictionsListCreateEnvelopeInput = {
    set?: AgentPredictionsHistoryPastSevenPredictionsCreateInput | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCreateInput = {
    ceoAgent: AgentPredictionsHistoryPastSevenPredictionsCeoAgentCreateInput
    lastUpdated: string
    resultPrice: AgentPredictionsHistoryPastSevenPredictionsResultPriceCreateInput
    targetDate: string
    technicalAgent: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentCreateInput
    timestamp: string
    wisdomOfCrowds: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsCreateInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsListUpdateEnvelopeInput = {
    set?: AgentPredictionsHistoryPastSevenPredictionsCreateInput | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    push?: AgentPredictionsHistoryPastSevenPredictionsCreateInput | AgentPredictionsHistoryPastSevenPredictionsCreateInput[]
    updateMany?: AgentPredictionsHistoryPastSevenPredictionsUpdateManyInput
    deleteMany?: AgentPredictionsHistoryPastSevenPredictionsDeleteManyInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PredictionsMessagesCurrentAnalysisCreateEnvelopeInput = {
    set?: PredictionsMessagesCurrentAnalysisCreateInput
  }

  export type PredictionsMessagesCurrentAnalysisCreateInput = {
    CeoAgent?: PredictionsMessagesCurrentAnalysisCreateCeoAgentInput | string[]
    CrowdAnalystAgent?: PredictionsMessagesCurrentAnalysisCreateCrowdAnalystAgentInput | string[]
    TechnicalAgent?: PredictionsMessagesCurrentAnalysisCreateTechnicalAgentInput | string[]
  }

  export type PredictionsMessagesCurrentAnalysisUpdateEnvelopeInput = {
    set?: PredictionsMessagesCurrentAnalysisCreateInput
    update?: PredictionsMessagesCurrentAnalysisUpdateInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type AgentPredictionsHistoryPastSevenPredictionsWhereInput = {
    AND?: AgentPredictionsHistoryPastSevenPredictionsWhereInput | AgentPredictionsHistoryPastSevenPredictionsWhereInput[]
    OR?: AgentPredictionsHistoryPastSevenPredictionsWhereInput[]
    NOT?: AgentPredictionsHistoryPastSevenPredictionsWhereInput | AgentPredictionsHistoryPastSevenPredictionsWhereInput[]
    ceoAgent?: XOR<AgentPredictionsHistoryPastSevenPredictionsCeoAgentCompositeFilter, AgentPredictionsHistoryPastSevenPredictionsCeoAgentObjectEqualityInput>
    lastUpdated?: StringFilter<"AgentPredictionsHistoryPastSevenPredictions"> | string
    resultPrice?: XOR<AgentPredictionsHistoryPastSevenPredictionsResultPriceCompositeFilter, AgentPredictionsHistoryPastSevenPredictionsResultPriceObjectEqualityInput>
    targetDate?: StringFilter<"AgentPredictionsHistoryPastSevenPredictions"> | string
    technicalAgent?: XOR<AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentCompositeFilter, AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentObjectEqualityInput>
    timestamp?: StringFilter<"AgentPredictionsHistoryPastSevenPredictions"> | string
    wisdomOfCrowds?: XOR<AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsCompositeFilter, AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsObjectEqualityInput>
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentObjectEqualityInput = {
    close: number
    high: number
    low: number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceObjectEqualityInput = {
    close?: number | null
    fetchedAt?: string | null
    high?: number | null
    low?: number | null
    open?: number | null
    timestamp?: string | null
  }

  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentObjectEqualityInput = {
    close: number
    high: number
    low: number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsObjectEqualityInput = {
    close: number
    high: number
    low: number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PredictionsMessagesCurrentAnalysisWhereInput = {
    AND?: PredictionsMessagesCurrentAnalysisWhereInput | PredictionsMessagesCurrentAnalysisWhereInput[]
    OR?: PredictionsMessagesCurrentAnalysisWhereInput[]
    NOT?: PredictionsMessagesCurrentAnalysisWhereInput | PredictionsMessagesCurrentAnalysisWhereInput[]
    CeoAgent?: StringNullableListFilter<"PredictionsMessagesCurrentAnalysis">
    CrowdAnalystAgent?: StringNullableListFilter<"PredictionsMessagesCurrentAnalysis">
    TechnicalAgent?: StringNullableListFilter<"PredictionsMessagesCurrentAnalysis">
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentCreateInput = {
    close: number
    high: number
    low: number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceCreateInput = {
    close?: number | null
    fetchedAt?: string | null
    high?: number | null
    low?: number | null
    open?: number | null
    timestamp?: string | null
  }

  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentCreateInput = {
    close: number
    high: number
    low: number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsCreateInput = {
    close: number
    high: number
    low: number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsUpdateManyInput = {
    where: AgentPredictionsHistoryPastSevenPredictionsWhereInput
    data: AgentPredictionsHistoryPastSevenPredictionsUpdateInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsDeleteManyInput = {
    where: AgentPredictionsHistoryPastSevenPredictionsWhereInput
  }

  export type PredictionsMessagesCurrentAnalysisCreateCeoAgentInput = {
    set: string[]
  }

  export type PredictionsMessagesCurrentAnalysisCreateCrowdAnalystAgentInput = {
    set: string[]
  }

  export type PredictionsMessagesCurrentAnalysisCreateTechnicalAgentInput = {
    set: string[]
  }

  export type PredictionsMessagesCurrentAnalysisUpdateInput = {
    CeoAgent?: PredictionsMessagesCurrentAnalysisUpdateCeoAgentInput | string[]
    CrowdAnalystAgent?: PredictionsMessagesCurrentAnalysisUpdateCrowdAnalystAgentInput | string[]
    TechnicalAgent?: PredictionsMessagesCurrentAnalysisUpdateTechnicalAgentInput | string[]
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentCompositeFilter = {
    equals?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentObjectEqualityInput
    is?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentWhereInput
    isNot?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentWhereInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceCompositeFilter = {
    equals?: AgentPredictionsHistoryPastSevenPredictionsResultPriceObjectEqualityInput
    is?: AgentPredictionsHistoryPastSevenPredictionsResultPriceWhereInput
    isNot?: AgentPredictionsHistoryPastSevenPredictionsResultPriceWhereInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentCompositeFilter = {
    equals?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentObjectEqualityInput
    is?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentWhereInput
    isNot?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentWhereInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsCompositeFilter = {
    equals?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsObjectEqualityInput
    is?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsWhereInput
    isNot?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsWhereInput
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsUpdateInput = {
    ceoAgent?: XOR<AgentPredictionsHistoryPastSevenPredictionsCeoAgentUpdateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsCeoAgentCreateInput>
    lastUpdated?: StringFieldUpdateOperationsInput | string
    resultPrice?: XOR<AgentPredictionsHistoryPastSevenPredictionsResultPriceUpdateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsResultPriceCreateInput>
    targetDate?: StringFieldUpdateOperationsInput | string
    technicalAgent?: XOR<AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentUpdateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentCreateInput>
    timestamp?: StringFieldUpdateOperationsInput | string
    wisdomOfCrowds?: XOR<AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsUpdateEnvelopeInput, AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsCreateInput>
  }

  export type PredictionsMessagesCurrentAnalysisUpdateCeoAgentInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PredictionsMessagesCurrentAnalysisUpdateCrowdAnalystAgentInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PredictionsMessagesCurrentAnalysisUpdateTechnicalAgentInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentWhereInput = {
    AND?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentWhereInput | AgentPredictionsHistoryPastSevenPredictionsCeoAgentWhereInput[]
    OR?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentWhereInput[]
    NOT?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentWhereInput | AgentPredictionsHistoryPastSevenPredictionsCeoAgentWhereInput[]
    close?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsCeoAgent"> | number
    high?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsCeoAgent"> | number
    low?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsCeoAgent"> | number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceWhereInput = {
    AND?: AgentPredictionsHistoryPastSevenPredictionsResultPriceWhereInput | AgentPredictionsHistoryPastSevenPredictionsResultPriceWhereInput[]
    OR?: AgentPredictionsHistoryPastSevenPredictionsResultPriceWhereInput[]
    NOT?: AgentPredictionsHistoryPastSevenPredictionsResultPriceWhereInput | AgentPredictionsHistoryPastSevenPredictionsResultPriceWhereInput[]
    close?: FloatNullableFilter<"AgentPredictionsHistoryPastSevenPredictionsResultPrice"> | number | null
    fetchedAt?: StringNullableFilter<"AgentPredictionsHistoryPastSevenPredictionsResultPrice"> | string | null
    high?: FloatNullableFilter<"AgentPredictionsHistoryPastSevenPredictionsResultPrice"> | number | null
    low?: FloatNullableFilter<"AgentPredictionsHistoryPastSevenPredictionsResultPrice"> | number | null
    open?: FloatNullableFilter<"AgentPredictionsHistoryPastSevenPredictionsResultPrice"> | number | null
    timestamp?: StringNullableFilter<"AgentPredictionsHistoryPastSevenPredictionsResultPrice"> | string | null
  }

  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentWhereInput = {
    AND?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentWhereInput | AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentWhereInput[]
    OR?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentWhereInput[]
    NOT?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentWhereInput | AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentWhereInput[]
    close?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent"> | number
    high?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent"> | number
    low?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsTechnicalAgent"> | number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsWhereInput = {
    AND?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsWhereInput | AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsWhereInput[]
    OR?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsWhereInput[]
    NOT?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsWhereInput | AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsWhereInput[]
    close?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds"> | number
    high?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds"> | number
    low?: FloatFilter<"AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowds"> | number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentUpdateEnvelopeInput = {
    set?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentCreateInput
    update?: AgentPredictionsHistoryPastSevenPredictionsCeoAgentUpdateInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceUpdateEnvelopeInput = {
    set?: AgentPredictionsHistoryPastSevenPredictionsResultPriceCreateInput
    update?: AgentPredictionsHistoryPastSevenPredictionsResultPriceUpdateInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentUpdateEnvelopeInput = {
    set?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentCreateInput
    update?: AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentUpdateInput
  }

  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsUpdateEnvelopeInput = {
    set?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsCreateInput
    update?: AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsUpdateInput
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type AgentPredictionsHistoryPastSevenPredictionsCeoAgentUpdateInput = {
    close?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsResultPriceUpdateInput = {
    close?: NullableFloatFieldUpdateOperationsInput | number | null
    fetchedAt?: NullableStringFieldUpdateOperationsInput | string | null
    high?: NullableFloatFieldUpdateOperationsInput | number | null
    low?: NullableFloatFieldUpdateOperationsInput | number | null
    open?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgentPredictionsHistoryPastSevenPredictionsTechnicalAgentUpdateInput = {
    close?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
  }

  export type AgentPredictionsHistoryPastSevenPredictionsWisdomOfCrowdsUpdateInput = {
    close?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}