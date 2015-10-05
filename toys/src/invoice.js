/**
 * Created by chris_000 on 10/4/2015.
 */

let hours = "66.5",
    rate = "$75/hour",
    total = "$" + (66.5 * 75).toFixed(2);

let customer = {
    name: 'Customer',
    address1: 'address1',
    address2: 'address2',
    city: 'city',
    state: 'state',
    zip: 'zip'
};


let invoice = `
﻿<HTML>
<HEAD>
<TITLE>Invoice</TITLE>
<STYLE TYPE="text/css" media="all">
  table {clear: both; BORDER-COLLAPSE: collapse; }
  #invoiceHead {text-align: right; font: 200% bold; }
  .Address {width: 50%; clear: both; border: 1px solid black; margin-bottom: 25px; }
  .AddressHead {font-weight: bold; BACKGROUND-COLOR: #cccccc; text-align: center; border-bottom: 1px solid black;}
  .AddressBody {margin: 1em;}
  .SmallSection {text-align: center; width: 10em; border: 1px solid black;  margin-bottom: 25px;}
  #Charges {width: 100%; border: 1px solid black; }
  #Charges td { padding-left: 1em; padding-right: 1em; }
  #Charges th { padding-left: 1em; padding-right: 1em; background-color: #DDD }
  #Notes {width: 70%;}
  #NotesHead {font: bold; margin-top:25px;}
</STYLE>
</HEAD>
<BODY>
<div id="invoiceHead">Invoice</div>
<div style="float: right;">
<div class="SmallSection">
<div class="AddressHead">Invoice Number</div>2015-009</div><div class="SmallSection"><div class="AddressHead">Date</div>10/1/2015</div><div class="SmallSection"><div class="AddressHead">Due</div>10/16/2015</div></div><div class="Address"><div class="AddressHead">Pay To</div><div class="AddressBody">
    Christopher C. Powell<BR />
    872 West Kettle Ave.<BR />
    Littleton, CO 80120<BR />
    303-798-3816<BR /></div></div><div class="Address">
    <div class="AddressHead">Bill To</div>
    <div class="AddressBody">
    <div>${customer.name}</div>
    <div>${customer.address1}</div>
    <div>${customer.address2}</div>
    <div>${customer.city},&nbsp;${customer.state}&nbsp;${customer.zip}</div>
    </div>
    </div>
    <TABLE ID="Charges"><thead><TR><TH WIDTH="60%" align="left">
        Item
      </TH><TH WIDTH="10%" align="right">
        Hours
      </TH><TH WIDTH="15%" align="right">
        Rate
      </TH><TH WIDTH="15%" align="right">
        Amount
      </TH></TR></thead><tbody><TR><TD ALIGN="left">Consulting services for September, 2015</TD><TD ALIGN="right">4.50</TD><TD ALIGN="right">
$60.00</TD><TD ALIGN="right">
$270.00</TD></TR><tr><td colspan="4"> </td></tr><tr><td colspan="3" align="right">Total Due</td><td align="right">
        $270.00</td></tr></tbody></TABLE></BODY></HTML>`;

console.log(invoice);