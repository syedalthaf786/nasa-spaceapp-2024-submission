// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('src/conti.json')
    .then(response => response.json())
    .then(data => {
      const teamContainer = document.getElementById('team-container');

      // Loop through each team member and create HTML content
      data.forEach(member => {
        const memberSection = document.createElement('section');
        memberSection.classList.add('group', 'relative');

        memberSection.innerHTML = `
          <div class="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <img 
              src="${member.image}" 
              class="rounded-full transition delay-200 group-hover:border-[#bde9ff] border-4 border-[#001f2e] object-cover h-[100px] w-[100px]" 
              alt="${member.name}" />
          </div>
          <div class="group-hover:bg-[#001f2e] transition delay-200 bg-[#bde9ff] pt-16 px-4 pb-4 text-center">
            <h2 class="group-hover:text-white transition delay-200 text-[#001f2e] text-2xl font-semibold">
              ${member.name}
            </h2>
            <p class="group-hover:text-white transition delay-200 text-[#001f2e] pt-4 leading-6 text-base font-bold">
              ${member.desc}
            </p>
             <p class="group-hover:text-white transition delay-200 text-[#001f2e] pt-4 leading-6 text-base h-24 overflow-hidden">
          ${member.info}
        </p>
            <div class="mt-4 flex justify-center space-x-4">
          <a href="${member.linkedin}" target="_blank" class="hover:text-blue-800">
            <i class="fab fa-linkedin text-2xl"></i>
          </a>
          <a href="${member.github}" target="_blank" class=hover:text-gray-800">
            <i class="fab fa-github text-2xl"></i>
          </a>
          <a href="mailto:${member.email}" class="hover:text-red-800">
            <i class="fas fa-envelope text-2xl"></i>
          </a>
          <a href="tel:${member.phone}" class="hover:text-green-800">
            <i class="fas fa-phone text-2xl"></i>
          </a>
        </div>
          </div>
        `;

        teamContainer.appendChild(memberSection);
      });
    })
    .catch(error => {
      console.error('Error fetching team data:', error);
    })
});
