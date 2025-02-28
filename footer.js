document.addEventListener("DOMContentLoaded", function() {
    const footerHTML = `
        <footer class="footer">
            <div class="footer_info">
                <div>
                    <img src="assets/img/pinhallitoral-removebg-preview (2).png" class="img_footer" alt="logo_footer_bp">
                </div>
    
                <div class="footer_info_side-left">
                    <p>
                        &copy; 2025 Prefeitura Municipal de Balneário Pinhal
                    </p>
    
                    <p>
                        Av. Itália, 3100, Centro CEP: 95599-000
                    </p>
    
                    <p>
                        imprensa@balneariopinhal.rs.gov.br
                    </p>
                </div>
            </div>
    
            <div class="footer_info_two">
                <p style="color:white;">(51) 2103-6929</p>
                <i class="fa fa-info"></i>
                <a href="https://balneariopinhal.rs.gov.br/sic/bcid/41/?acesso-a-informacao.html"> ÁCESSO A INFORMAÇÃO</a>
            </div>
        </footer>
    
        <footer class="footer_dev_end">
            <div class="footer_dev_end">
                <p>Desenvolvido por <a href="https://github.com/DevLarre" target="_blank">Douglas Larré</a></p>
            </div>
        </footer>
    `;

    // Selecionando o local onde o footer será inserido (exemplo: footerContainer)
    document.getElementById('footerContainer').innerHTML = footerHTML;
});
