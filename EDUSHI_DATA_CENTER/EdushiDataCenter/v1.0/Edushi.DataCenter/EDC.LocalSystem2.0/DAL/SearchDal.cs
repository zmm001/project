�}�� r    �������a	��� �ӟHڶ}��u՝dz������(o=K�H�����VN� �+�󿈑���а�n�Ѫs$��3ja:����0Yɥ���XƄǀ|�����0N���-W3W���X�K,ڵ�4�-d�;F~�h@Y�X��'�o-~������Akk����Yw!@����qr#�� �~P�&X���ב���]�� Hu-��1��h�Թ��;T+f���!^|48ZYi0���CY�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�ataTable();
            string str = "select LST_ID,LCE_Level  from Map_CompanyInfo c left join Local_CompanyInfoExt ce ON c.MCI_ID = ce.MCI_ID where c.MCI_ID in ("+sqlStr+")";
            dt = this.FillDataTable(str);

            return dt;
         
        }
       
    }
}
