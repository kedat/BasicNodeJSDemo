
export async function createUser(user, ctx) {
  if (user.acceptTermsAndConditions) {
    return await ctx.prisma.user.create({
      data: user,
    })
  } else {
    return new Error('User must accept terms!')
  }
}
