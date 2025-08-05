function calculate() {
    const mindshare = parseFloat(document.getElementById('mindshare').value);
    const season = document.getElementById('season').value;
    const username = document.getElementById('username').value.trim();
    const ranking = document.getElementById('ranking').value.trim();
    const totalTokens = 65000000;

    let percentage = season === 'season0' ? 0.6 : 0.4;

    if (!isNaN(mindshare)) {
        const result = mindshare * ((totalTokens * percentage)/100);
        const formatted = result.toLocaleString(undefined, { maximumFractionDigits: 2 });

        document.getElementById('popup-username').textContent = username || 'USERNAME';
        document.getElementById('popup-rank').textContent = `RANK: ${ranking || 'RANK'}`;
        document.getElementById('popup-total').textContent = `TOTAL $U: ${formatted}`;
        showPopup();
    } else {
        document.getElementById('popup-total').textContent = '❌ Invalid mindshare value.';
        showPopup();
    }
}

function showPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'flex'; // must be flex because .popup uses flexbox
    } else {
        console.error('Popup element not found');
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function shareToTwitter() {
  const username = document.getElementById('popup-username').textContent;
  const rank = document.getElementById('popup-rank').textContent.replace('RANK: ', '');
  const totalU = document.getElementById('popup-total').textContent.replace('', '');

  const tweetText = `${username} | Rank: ${rank} | Total $U: ${totalU} — calculated with the YAPPERS card.\n\n chcek your yapper allocation\nhttps://yappers.xyz`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(tweetUrl, '_blank');
}

function downloadCard() {
  const username = document.getElementById('username').value || 'anonymous';
  const rank = document.getElementById('popup-rank').textContent;
  const total = document.getElementById('popup-total').textContent;
  const type = document.getElementById('popup-type')?.textContent || 'U–YAPPER';

  // Fill values
  document.getElementById('sc-username').textContent = username;
  document.getElementById('sc-rank').textContent = rank;
  document.getElementById('sc-total').textContent = total;
  document.getElementById('sc-type').textContent = type;

  const scCard = document.getElementById('screenshot-card');
  scCard.style.display = 'block';

  html2canvas(scCard, {
    backgroundColor: null,
    useCORS: true,
    scale: 2
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'yappers-card.png';
    link.href = canvas.toDataURL();
    link.click();
    scCard.style.display = 'none';
  });
}


