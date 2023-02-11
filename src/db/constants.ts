/**
 * @see https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
export enum PostgresExceptionCodes {
  UNIQUE_VIOLATION = '23505',
  NOT_NULL_VIOLATION = '23502',
}
