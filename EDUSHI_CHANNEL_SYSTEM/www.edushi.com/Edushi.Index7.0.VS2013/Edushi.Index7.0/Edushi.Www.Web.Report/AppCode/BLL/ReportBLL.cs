�}w� r �	  c��4���a	��� �+ J>v|�,�&�����Y�Js�:���Cq�ՇC���Wm�?��IR	 �������i�	ij�3lf,�}#VE�p��poQ��|��EO�a�o���sk�g/�O�C]�R�$��d�A:�bҖW���;�$��f�VzBóh]=�������N��,�����+CC"t��T4o�r0Q-*����Ç�i��ЫϪ���3,��N[W���6SI	�jrx8F��[�)�6��CY�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�// <param name="ert_Remarks"></param>
        /// <param name="ert_ip"></param>
        /// <returns></returns>
        public int AddReport(string ert_url, string ert_type, string ert_phone, string ert_name, string ert_Remarks, string ert_ip)
        {
            return new ReportDAL().AddReport(ert_url, ert_type, ert_phone, ert_name, ert_Remarks, ert_ip);
        }
        #endregion
    }
}
