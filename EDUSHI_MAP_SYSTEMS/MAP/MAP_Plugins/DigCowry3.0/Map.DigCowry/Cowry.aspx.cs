�}m� r �  ;��H'����a	��"��_B��}���:�|Z��s}p3w�
@��Uw5��~%� �Ĉ�$�%�C ���e�W���@�0����� ��Q�ŀ��!C̬f�p�m{�$�I)\��	*Vq��(I��HW]l��O^^
0(up��q��üw'�6����� 1gZ�;�t�V��^r֥��1�4pjN̮�Kcdr�Y��T�ҹ��:S���2r�^�kG���a�%w�{����^���8���^ n�(]h��l�U֔]D�����	�h�qF���a�,&!��>�5�k��}aq>l��IK ~F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�'3T�~�E'@t��a�r3Q\�_�z@�ŗխɍ*-���0��C�tM��1�!�r+�*zn��J�'����֜��JN�#���G�tk�ԝ2B�����N�M��2Z�ĥ_�$���F}�����,�c+*Hl��Zd"��U�c��Դsx6���	���	��l>�w���#�E6�!�Y��0��3�'�yt�_���z�P��qk&_�4t���r��Ge�O�n�܎���J8�����s�Β���ޡ��V˫)����n��vi�f�w���6 ��1�iM�j9I~�=3���H	ރu#�[�������g ��03������aS���F�YD`����ō�ۜ��bfl8cP
��W�9��{����d�H�Zs�kM��7��"v�n�H7/4�DE�p�g����ʫuy�˿�Gt���2S��hC�k��`��(	�_�(���>�W��)%k���x���l~b�l�3��R�9[�-͒-F��#�ble dt = dig.GetTrophys(AspNetPager1.CurrentPageIndex, AspNetPager1.PageSize, out recordcount);
            rptCowryList.DataSource = dt.DefaultView;
            rptCowryList.DataBind();
            AspNetPager1.RecordCount = recordcount;    
        }
        protected void AspNetPager_PageChanged(object sender, EventArgs e)
        {
            BindCowry();
        }
    }
}
