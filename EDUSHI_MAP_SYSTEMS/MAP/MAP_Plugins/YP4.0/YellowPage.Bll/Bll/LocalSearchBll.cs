�}"� r �  �s9��$/ ��a	��� �۟����AMƈ�]2�Lt�uv�Vig�?7��XnIdw&YmL~���Z����/H�W���­�O�Z��T��K���Oۤ�`�"�rǦ�,ұ1��#Kj:������c�>M��^}8� P�|Ъƙ�#�n攅j��\n���(^:!��*�޷�M.7v��*�R���'�:}�l2����ю�l�M0g��i��dp��ڭ�*^�d�s���2���]����a��:�%�KR�}�<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�YP(PageNum,PageSize,ref recordCount,keyWord);       
       }
       public DataSet fHostDataSet
       {
           get { return dal.fHostDataSet;}
          
       }
       public void Search(int PageNum, int PageSize, ref int recordCount, string keyWord)
       {
           dal.Search(PageNum, PageSize, ref  recordCount, keyWord);
       }


    }
}
