import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { createGuest, getGuest } from './data-service';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,

  callbacks: {
    ...authConfig.callbacks,

    async signIn({ user }) {
      const existingGuest = await getGuest(user.email);

      if (!existingGuest) {
        await createGuest({
          email: user.email,
          fullName: user.name,
        });
      }

      return true;
    },

    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
});
