"use strict";
var PositionGroup;
(function (PositionGroup) {
    PositionGroup[PositionGroup["QB"] = 0] = "QB";
    PositionGroup[PositionGroup["RB"] = 1] = "RB";
    PositionGroup[PositionGroup["FB"] = 2] = "FB";
    PositionGroup[PositionGroup["WR"] = 3] = "WR";
    PositionGroup[PositionGroup["TE"] = 4] = "TE";
    PositionGroup[PositionGroup["T"] = 5] = "T";
    PositionGroup[PositionGroup["G"] = 6] = "G";
    PositionGroup[PositionGroup["C"] = 7] = "C";
    PositionGroup[PositionGroup["DL"] = 8] = "DL";
    PositionGroup[PositionGroup["EDGE"] = 9] = "EDGE";
    PositionGroup[PositionGroup["LB"] = 10] = "LB";
    PositionGroup[PositionGroup["CB"] = 11] = "CB";
    PositionGroup[PositionGroup["S"] = 12] = "S";
    PositionGroup[PositionGroup["K"] = 13] = "K";
    PositionGroup[PositionGroup["P"] = 14] = "P";
    PositionGroup[PositionGroup["LS"] = 15] = "LS";
    PositionGroup[PositionGroup["ST"] = 16] = "ST";
})(PositionGroup || (PositionGroup = {}));
var PositionRoles;
(function (PositionRoles) {
    PositionRoles[PositionRoles["QB"] = 0] = "QB";
    PositionRoles[PositionRoles["RB"] = 1] = "RB";
    PositionRoles[PositionRoles["FB"] = 2] = "FB";
    PositionRoles[PositionRoles["WR"] = 3] = "WR";
    PositionRoles[PositionRoles["SLOT"] = 4] = "SLOT";
    PositionRoles[PositionRoles["TE"] = 5] = "TE";
    PositionRoles[PositionRoles["LT"] = 6] = "LT";
    PositionRoles[PositionRoles["LG"] = 7] = "LG";
    PositionRoles[PositionRoles["C"] = 8] = "C";
    PositionRoles[PositionRoles["RG"] = 9] = "RG";
    PositionRoles[PositionRoles["RT"] = 10] = "RT";
    PositionRoles[PositionRoles["LE43"] = 11] = "LE43";
    PositionRoles[PositionRoles["LDT"] = 12] = "LDT";
    PositionRoles[PositionRoles["RDT"] = 13] = "RDT";
    PositionRoles[PositionRoles["RE43"] = 14] = "RE43";
    PositionRoles[PositionRoles["LOLB43"] = 15] = "LOLB43";
    PositionRoles[PositionRoles["MLB"] = 16] = "MLB";
    PositionRoles[PositionRoles["ROLB43"] = 17] = "ROLB43";
    PositionRoles[PositionRoles["LE34"] = 18] = "LE34";
    PositionRoles[PositionRoles["NT"] = 19] = "NT";
    PositionRoles[PositionRoles["RE34"] = 20] = "RE34";
    PositionRoles[PositionRoles["LOLB34"] = 21] = "LOLB34";
    PositionRoles[PositionRoles["LILB"] = 22] = "LILB";
    PositionRoles[PositionRoles["RILB"] = 23] = "RILB";
    PositionRoles[PositionRoles["ROLB34"] = 24] = "ROLB34";
    PositionRoles[PositionRoles["LCB"] = 25] = "LCB";
    PositionRoles[PositionRoles["STAR"] = 26] = "STAR";
    PositionRoles[PositionRoles["SS"] = 27] = "SS";
    PositionRoles[PositionRoles["FS"] = 28] = "FS";
    PositionRoles[PositionRoles["RCB"] = 29] = "RCB";
    PositionRoles[PositionRoles["PK"] = 30] = "PK";
    PositionRoles[PositionRoles["H"] = 31] = "H";
    PositionRoles[PositionRoles["LS"] = 32] = "LS";
    PositionRoles[PositionRoles["P"] = 33] = "P";
    PositionRoles[PositionRoles["UPB"] = 34] = "UPB";
    PositionRoles[PositionRoles["GUN"] = 35] = "GUN";
    PositionRoles[PositionRoles["JAM"] = 36] = "JAM";
    PositionRoles[PositionRoles["PR"] = 37] = "PR";
    PositionRoles[PositionRoles["KOS"] = 38] = "KOS";
    PositionRoles[PositionRoles["KR"] = 39] = "KR";
})(PositionRoles || (PositionRoles = {}));
var PositionPlayer = /** @class */ (function () {
    function PositionPlayer(position) {
        this.position = position;
    }
    return PositionPlayer;
}());
var PositionRole = /** @class */ (function () {
    function PositionRole() {
    }
    return PositionRole;
}());
var Positions = /** @class */ (function () {
    function Positions() {
    }
    Positions.positionGroupContainsRole = function (group, roles) {
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
    };
    return Positions;
}());
