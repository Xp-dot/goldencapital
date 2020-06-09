function calculate (f) {

    if ((f.im1.value != "" && f.soc2.value != "") ||
        (f.soc1.value != "" && f.im2.value != "") ||
        (f.zasch1.value != "" && f.nap2.value != "") ||
        (f.nap1.value != "" && f.zasch2.value != ""))

        {
        var im1 = Number(f.im1.value);
        var soc1 = Number(f.soc1.value);
        var zasch1 = Number(f.zasch1.value);
        var nap1 = Number(f.nap1.value);

        var im2 = Number(f.im2.value);
        var soc2 = Number(f.soc2.value);
        var zasch2 = Number(f.zasch2.value);
        var nap2 = Number(f.nap2.value);

        var ud1 = Math.round (10 * soc1 / (im2 + soc1));
        var ud3 = Math.round (10 * soc2 / (im1 + soc2));
        k = (f.rage.checked) ? 15 : 10;
        var ud2 = Math.round (k * nap1 / (zasch2 + nap1));
        var ud4 = Math.round (k * nap2 / (zasch1 + nap2));

        alert ("��� ������� ����: " + ud1 + "\n��� ������ ����: " + ud2 + "\n\n������� ���� ���������: " + ud3 + "\n������ ���� ���������: " + ud4);
        return 0;
    }

    else
    {
        alert ("������. ������� FAQ.");
        return -1;
    }
}

function defense (attack, strike, rage)
{
    var coef = rage ? 15 : 10;
    var d_top = Math.floor(attack * (1 - (strike - 0.5) / coef) / ((strike-0.5)/coef));
    var d_bottom = Math.ceil(attack * (1 - (strike + 0.5) / coef) / ((strike + 0.5) / coef));

    return (d_bottom + '-' + d_top);
}

function attack (defense, strike, rage)
{
    var coef = rage ? 15 : 10;
    var a_top = Math.floor(((strike + 0.5) * defense / coef) / (1 - (strike + 0.5) / 10));
    var a_bottom = Math.ceil(((strike - 0.5) * defense / coef) / (1 - (strike - 0.5) / 10));

    return (a_bottom + '-' + a_top);
}

function strike (attack, defense, rage)
{
    var coef = rage ? 15 : 10;
    return (Math.round (coef * attack / (attack + defense)));
}

function onlyDigits(e, obj)
{
    return true;
}

function reCalc (f)
{
    var imm, soc, zasch, nap, ud, rage, mode;

    mode = Number (f.mode.value);
    switch (mode) {
        case 1:
        default:
        {
            if (f.imm1.value != "" && f.soc2.value != "")
            {
                imm = Number(f.imm1.value);
                soc = Number(f.soc2.value);
                f.ud21.value = strike (soc, imm, false);
            }
            else
            {
                f.ud21.value = "";
            }

            if (f.imm2.value != "" && f.soc1.value != "")
            {
                imm = Number(f.imm2.value);
                soc = Number(f.soc1.value);
                f.ud12.value = strike (soc, imm, false);
            }
            else
            {
                f.ud12.value="";
            }

            if (f.nap1.value != "" && f.zasch2.value != "")
            {
                rage = f.rage.checked;
                nap = Number(f.nap1.value);
                zasch = Number(f.zasch2.value);
                f.un12.value = strike (nap, zasch, rage);
            }
            else
            {
                f.un12.value = "";
            }

            if (f.nap2.value != "" && f.zasch1.value != "")
            {
                rage = f.rage.checked;
                nap = Number(f.nap2.value);
                zasch = Number(f.zasch1.value);
                f.un21.value = strike (nap, zasch, rage);
            }
            else
            {
                f.un21.value = "";
            }
            break;
        }
        case 2:
        {
            if (f.soc1.value == "" && f.imm2.value != "" && f.ud12.value != "")
            {
                imm = Number(f.imm2.value);
                ud = Number (f.ud12.value);
                f.soc1.value = attack (imm, ud, false);
            }

            if (f.soc2.value == "" && f.imm1.value != "" && f.ud21.value != "")
            {
                imm = Number(f.imm1.value);
                ud = Number (f.ud21.value);
                f.soc2.value = attack (imm, ud, false);
            }
            if (f.imm1.value == "" && f.soc2.value != "" && f.ud21.value != "")
            {
                soc = Number(f.soc2.value);
                ud = Number (f.ud21.value);
                f.imm1.value = defense (soc, ud, false);
            }
            if (f.imm2.value == "" && f.soc1.value != "" && f.ud12.value != "")
            {
                soc = Number(f.soc1.value);
                ud = Number (f.ud12.value);
                f.imm2.value = defense (soc, ud, false);
            }
            //

            if (f.nap1.value == "" && f.zasch2.value != "" && f.un12.value != "")
            {
                zasch = Number(f.zasch2.value);
                alert(zasch);
                ud = Number (f.un12.value);
                alert(ud);
                rage = f.rage.checked;
                f.nap1.value = attack (zasch, ud, rage);
            }
            if (f.nap2.value == "" && f.zasch1.value != "" && f.un21.value != "")
            {
                zasch = Number(f.zasch1.value);
                ud = Number (f.un21.value);
                rage = f.rage.checked;
                f.nap2.value = attack (zasch, ud, rage);
            }

            if (f.zasch1.value == "" && f.nap2.value != "" && f.un21.value != "")
            {
                nap = Number(f.nap2.value);
                ud = Number (f.un21.value);
                rage = f.rage.checked;
                f.zasch1.value = defense (nap, ud, rage);
            }

            if (f.zasch2.value == "" && f.nap1.value != "" && f.un12.value != "")
            {
                nap = Number(f.nap1.value);
                alert (nap);
                ud = Number (f.un12.value);
                alert (ud);
                rage = f.rage.checked;
                alert (rage);
                f.zasch2.value = defense (nap, ud, rage);
            }
        }
    }
}

function changeMode (f)
{
    var newmode = Number(f.mode.value);
    //alert (newmode);

    switch (newmode)
    {
        case 1 :
        {
            f.soc1.size=3;
            f.soc2.size=3;
            f.imm1.size=3;
            f.imm2.size=3;
            f.nap1.size=3;
            f.nap2.size=3;
            f.zasch1.size=3;
            f.zasch2.size=3;

            f.soc1.maxLength=3;
            f.soc2.maxLength=3;
            f.imm1.maxLength=3;
            f.imm2.maxLength=3;
            f.nap1.maxLength=3;
            f.nap2.maxLength=3;
            f.zasch1.maxLength=3;
            f.zasch2.maxLength=3;

            f.ud12.disabled = true;
            f.ud21.disabled = true;
            f.un12.disabled = true;
            f.un21.disabled = true;

            break;
        }
        case 2 :
        {
            f.soc1.size=7;
            f.soc2.size=7;
            f.imm1.size=7;
            f.imm2.size=7;
            f.nap1.size=7;
            f.nap2.size=7;
            f.zasch1.size=7;
            f.zasch2.size=7;

            f.soc1.maxLength=7;
            f.soc2.maxLength=7;
            f.imm1.maxLength=7;
            f.imm2.maxLength=7;
            f.nap1.maxLength=7;
            f.nap2.maxLength=7;
            f.zasch1.maxLength=7;
            f.zasch2.maxLength=7;

            f.ud12.disabled = false;
            f.ud21.disabled = false;
            f.un12.disabled = false;
            f.un21.disabled = false;
            break;
        }
    }
}