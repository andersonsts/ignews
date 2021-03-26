export {};

declare module 'next-auth' {
    interface Session {
      activeSubscription: any
    }
}