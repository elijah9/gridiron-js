export enum PositionGroup {
  QB, RB, FB, WR, TE, T, G, C,
  DL, EDGE, LB, CB, S,
  K, P, LS, ST
}

export enum Position {
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

export class PositionPlayer {
  readonly position : PositionGroup;

  constructor(position: PositionGroup) {
    this.position = position;
  }
}

export class DepthRole {
  readonly role : Position;
  readonly depth : number;

  constructor(role : Position, depth : number = 1) {
    this.role = role;
    this.depth = depth;
  }

  toString() : string {
    return this.role.toString() + this.depth;
  }
}

export function positionGroupContainsRole(group: PositionGroup, role: Position): boolean {
  if (role === Position.GUN || role === Position.JAM
    || role === Position.UPB || role === Position.KR
    || role === Position.PR) {
    return true;
  }

  switch (group) {
    case PositionGroup.QB:
      return role === Position.QB;
    case PositionGroup.RB:
      return role === Position.RB;
    case PositionGroup.FB:
      return role === Position.FB;
    case PositionGroup.WR:
      return role === Position.WR || role === Position.SLOT;
    case PositionGroup.TE:
      return role === Position.TE;
    case PositionGroup.T:
      return role === Position.LT || role === Position.RT;
    case PositionGroup.G:
      return role === Position.LG || role === Position.RG;
    case PositionGroup.C:
      return role === Position.C;
    case PositionGroup.DL:
      return role === Position.LDT || role === Position.RDT
        || role === Position.LE34 || role === Position.RE34
        || role === Position.NT;
    case PositionGroup.EDGE:
      return role === Position.LE43 || role === Position.RE43
        || role === Position.LOLB34 || role === Position.ROLB34;
    case PositionGroup.LB:
      return role === Position.LOLB43 || role === Position.ROLB43
        || role === Position.LILB || role === Position.RILB
        || role === Position.MLB;
    case PositionGroup.CB:
      return role === Position.LCB || role === Position.RCB
        || role === Position.STAR;
    case PositionGroup.S:
      return role === Position.FS || role === Position.SS;
    case PositionGroup.K:
      return role === Position.PK || role === Position.KOS;
    case PositionGroup.P:
      return role === Position.P || role === Position.H;
    case PositionGroup.LS:
      return role === Position.LS;
    default:
      return false;
  }
}