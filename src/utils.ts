export type IfEqual<T, U, Y = true, N = false> =
    (<G>() => G extends T ? 1 : 2) extends
    (<F>() => F extends U ? 1 : 2) ? Y : N;