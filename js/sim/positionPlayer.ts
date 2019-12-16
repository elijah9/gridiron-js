enum PositionGroup {
  QB, RB, FB, WR, TE, T, G, C,
  DL, EDGE, LB, CB, S,
  K, P, LS, ST
}

enum PositionRoles {
  QB, RB, FB, WR, SLOT, TE,
  LT, LG, C, RG, RT,
  LE43, LDT, RDT, RE43,
  LOLB43, MLB, ROLB43,
  LE34, NT, RE34,
  LOLB34, LILB, RILB, ROLB34,
  LCB, STAR, SS, FS, RCB,
  PK, H, LS,
  P, UPB, GUN, JAM, PR,
  KOS, KR
}

class PositionPlayer {
  public readonly position : PositionGroup;

  constructor(position: PositionGroup) {
    this.position = position;
  }
}

class PositionRole {
  public readonly role : PositionRoles;
  public readonly depth : number;
}

class Positions {
  public static positionGroupContainsRole(group: PositionGroup, roles: PositionRoles): boolean {
    if (roles === PositionRoles.GUN || roles === PositionRoles.JAM
      || roles === PositionRoles.UPB || roles === PositionRoles.KR
      || roles === PositionRoles.PR) {
      return true;
    }

    switch (group) {
      case PositionGroup.QB:
        return roles === PositionRoles.QB;
      case PositionGroup.RB:
        return roles === PositionRoles.RB;
      case PositionGroup.FB:
        return roles === PositionRoles.FB;
      case PositionGroup.WR:
        return roles === PositionRoles.WR || roles === PositionRoles.SLOT;
      case PositionGroup.TE:
        return roles === PositionRoles.TE;
      case PositionGroup.T:
        return roles === PositionRoles.LT || roles === PositionRoles.RT;
      case PositionGroup.G:
        return roles === PositionRoles.LG || roles === PositionRoles.RG;
      case PositionGroup.C:
        return roles === PositionRoles.C;
      case PositionGroup.DL:
        return roles === PositionRoles.LDT || roles === PositionRoles.RDT
          || roles === PositionRoles.LE34 || roles === PositionRoles.RE34
          || roles === PositionRoles.NT;
      case PositionGroup.EDGE:
        return roles === PositionRoles.LE43 || roles === PositionRoles.RE43
          || roles === PositionRoles.LOLB34 || roles === PositionRoles.ROLB34;
      case PositionGroup.LB:
        return roles === PositionRoles.LOLB43 || roles === PositionRoles.ROLB43
          || roles === PositionRoles.LILB || roles === PositionRoles.RILB
          || roles === PositionRoles.MLB;
      case PositionGroup.CB:
        return roles === PositionRoles.LCB || roles === PositionRoles.RCB
          || roles === PositionRoles.STAR;
      case PositionGroup.S:
        return roles === PositionRoles.FS || roles === PositionRoles.SS;
      case PositionGroup.K:
        return roles === PositionRoles.PK || roles === PositionRoles.KOS;
      case PositionGroup.P:
        return roles === PositionRoles.P || roles === PositionRoles.H;
      case PositionGroup.LS:
        return roles === PositionRoles.LS;
      default:
        return false;
    }
  }
}