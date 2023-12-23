"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUsed = await followUser(id);
    revalidatePath("/");

    if (followedUsed) {
      revalidatePath(`${followedUsed.following.username}`);
    }

    return followedUsed;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);
    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
